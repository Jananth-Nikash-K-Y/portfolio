from fastapi import FastAPI, Request, Response
from langchain_community.llms import HuggingFaceHub
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import os
from dotenv import load_dotenv
import tempfile
import pyttsx3
import json
from pathlib import Path

# Load environment variables from .env file
load_dotenv()

# Get port from environment variable or use default
port = int(os.getenv("PORT", 8000))

app = FastAPI()

# Initialize components only once when the server starts
def init_components():
    # Load portfolio data
    portfolio_path = Path(__file__).parent / 'portfolio.txt'
    with open(portfolio_path, encoding='utf-8') as f:
        portfolio_text = f.read()

    # Split and embed portfolio
    docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
    
    # Use environment variables for model configuration
    embedding_model = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
    llm_model = os.getenv('LLM_MODEL', 'TinyLlama/TinyLlama-1.1B-Chat-v1.0')
    
    # Configure Hugging Face models
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model)
    vectorstore = FAISS.from_documents(docs, embeddings)

    # Set up LLM and chain
    llm = HuggingFaceHub(
        repo_id=llm_model,
        model_kwargs={"temperature": 0.7, "max_length": 512},
        huggingfacehub_api_token=os.getenv('HUGGINGFACE_API_TOKEN')
    )
    memory = ConversationBufferWindowMemory(k=3, memory_key='chat_history', return_messages=True)
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm, vectorstore.as_retriever(), memory=memory,
        return_source_documents=False
    )
    
    return qa_chain, memory

# Initialize components
qa_chain, memory = init_components()

@app.post('/api/chat')
async def chat(request: Request):
    data = await request.json()
    user_message = data['message']
    # Restrict to portfolio: check if answer is relevant, else reply with fallback
    result = qa_chain({'question': user_message, 'chat_history': memory.load_memory_variables({})['chat_history']})
    answer = result['answer']
    if 'Sorry' in answer or 'I do not know' in answer or 'I am not sure' in answer:
        answer = "I'm only able to answer questions about Jananth's portfolio. Please ask something related!"
    return {'answer': answer}

@app.post('/api/voice')
async def voice(request: Request):
    data = await request.json()
    text = data['text']
    # Synthesize speech to a temp WAV file
    engine = pyttsx3.init()
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tf:
        engine.save_to_file(text, tf.name)
        engine.runAndWait()
        tf.seek(0)
        audio_bytes = tf.read()
    return Response(content=audio_bytes, media_type='audio/wav')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=port) 