import json
from langchain_community.llms import HuggingFaceHub
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import os
import torch
from pathlib import Path

# Set device to CPU to reduce memory usage
device = "cpu"
torch.set_num_threads(1)

def init_components():
    try:
        # Load portfolio data
        portfolio_path = Path(__file__).parent.parent.parent / 'server' / 'portfolio.txt'
        with open(portfolio_path, encoding='utf-8') as f:
            portfolio_text = f.read()

        # Split and embed portfolio
        docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
        
        # Use environment variables for model configuration
        embedding_model = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
        llm_model = os.getenv('LLM_MODEL', 'TinyLlama/TinyLlama-1.1B-Chat-v1.0')
        
        # Configure Hugging Face models with memory optimizations
        embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={'device': device}
        )
        vectorstore = FAISS.from_documents(docs, embeddings)

        # Set up LLM and chain with memory optimizations
        llm = HuggingFaceHub(
            repo_id=llm_model,
            model_kwargs={
                "temperature": 0.7,
                "max_length": 512,
                "device_map": device,
                "torch_dtype": torch.float32
            },
            huggingfacehub_api_token=os.getenv('HUGGINGFACE_API_TOKEN')
        )
        memory = ConversationBufferWindowMemory(k=2, memory_key='chat_history', return_messages=True)
        qa_chain = ConversationalRetrievalChain.from_llm(
            llm, 
            vectorstore.as_retriever(search_kwargs={"k": 2}),
            memory=memory,
            return_source_documents=False
        )
        
        return qa_chain, memory
    except Exception as e:
        print(f"Error initializing components: {str(e)}")
        raise

# Initialize components
qa_chain, memory = init_components()

def handler(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])
        user_message = body['message']
        
        # Process the message
        result = qa_chain({
            'question': user_message, 
            'chat_history': memory.load_memory_variables({})['chat_history']
        })
        answer = result['answer']
        
        if 'Sorry' in answer or 'I do not know' in answer or 'I am not sure' in answer:
            answer = "I'm only able to answer questions about Jananth's portfolio. Please ask something related!"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({'answer': answer})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            'body': json.dumps({'error': str(e)})
        } 