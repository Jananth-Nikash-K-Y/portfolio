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
        print("Starting component initialization...")
        
        # Check environment variables
        hf_token = os.getenv('HUGGINGFACE_API_TOKEN')
        if not hf_token:
            raise ValueError("HUGGINGFACE_API_TOKEN not found in environment variables")
        print("HUGGINGFACE_API_TOKEN found")
        
        embedding_model = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
        llm_model = os.getenv('LLM_MODEL', 'TinyLlama/TinyLlama-1.1B-Chat-v1.0')
        print(f"Using embedding model: {embedding_model}")
        print(f"Using LLM model: {llm_model}")

        # Load portfolio data
        portfolio_path = Path(__file__).parent.parent.parent / 'server' / 'portfolio.txt'
        print(f"Loading portfolio from: {portfolio_path}")
        if not portfolio_path.exists():
            raise FileNotFoundError(f"Portfolio file not found at {portfolio_path}")
            
        with open(portfolio_path, encoding='utf-8') as f:
            portfolio_text = f.read()
        print("Portfolio data loaded successfully")

        # Split and embed portfolio
        print("Splitting and embedding portfolio...")
        docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
        
        # Configure Hugging Face models with memory optimizations
        print("Initializing embeddings...")
        embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model,
            model_kwargs={'device': device}
        )
        print("Creating vectorstore...")
        vectorstore = FAISS.from_documents(docs, embeddings)
        print("Vectorstore created successfully")

        # Set up LLM and chain with memory optimizations
        print("Initializing LLM...")
        llm = HuggingFaceHub(
            repo_id=llm_model,
            model_kwargs={
                "temperature": 0.7,
                "max_length": 512,
                "device_map": device,
                "torch_dtype": torch.float32
            },
            huggingfacehub_api_token=hf_token
        )
        print("LLM initialized successfully")
        
        memory = ConversationBufferWindowMemory(k=2, memory_key='chat_history', return_messages=True)
        print("Creating QA chain...")
        qa_chain = ConversationalRetrievalChain.from_llm(
            llm, 
            vectorstore.as_retriever(search_kwargs={"k": 2}),
            memory=memory,
            return_source_documents=False
        )
        print("QA chain created successfully")
        
        return qa_chain, memory
    except Exception as e:
        print(f"Error initializing components: {str(e)}")
        raise

# Initialize components
print("Starting to initialize components...")
try:
    qa_chain, memory = init_components()
    print("Components initialized successfully")
except Exception as e:
    print(f"Failed to initialize components: {str(e)}")
    raise

def handler(event, context):
    try:
        print("Received request")
        # Parse the request body
        body = json.loads(event['body'])
        user_message = body['message']
        print(f"Processing message: {user_message}")
        
        # Process the message
        print("Running QA chain...")
        result = qa_chain({
            'question': user_message, 
            'chat_history': memory.load_memory_variables({})['chat_history']
        })
        answer = result['answer']
        print(f"Got answer: {answer}")
        
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
        print(f"Error in handler: {str(e)}")
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