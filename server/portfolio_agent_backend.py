from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
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
import torch

# Load environment variables from .env file
load_dotenv()

# Set device to CPU to reduce memory usage
device = "cpu"
torch.set_num_threads(1)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize components only once when the server starts
def init_components():
    print("Initializing components...")
    try:
        # Load portfolio data
        portfolio_path = Path(__file__).parent / 'portfolio.txt'
        with open(portfolio_path, encoding='utf-8') as f:
            portfolio_text = f.read()

        # Split and embed portfolio
        docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
        
        # Use environment variables for model configuration
        embedding_model = os.getenv('EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2')
        llm_model = os.getenv('LLM_MODEL', 'TinyLlama/TinyLlama-1.1B-Chat-v1.0')
        
        print(f"Using embedding model: {embedding_model}")
        print(f"Using LLM model: {llm_model}")
        
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
        
        print("Components initialized successfully")
        return qa_chain, memory
    except Exception as e:
        print(f"Error initializing components: {str(e)}")
        raise

# Initialize components
try:
    qa_chain, memory = init_components()
except Exception as e:
    print(f"Failed to initialize components: {str(e)}")
    raise

@app.get("/")
async def root():
    return {"status": "ok", "message": "Server is running"}

@app.post('/api/chat')
async def chat(request: Request):
    try:
        data = await request.json()
        user_message = data['message']
        # Restrict to portfolio: check if answer is relevant, else reply with fallback
        result = qa_chain({'question': user_message, 'chat_history': memory.load_memory_variables({})['chat_history']})
        answer = result['answer']
        if 'Sorry' in answer or 'I do not know' in answer or 'I am not sure' in answer:
            answer = "I'm only able to answer questions about Jananth's portfolio. Please ask something related!"
        return {'answer': answer}
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return {"error": str(e)}, 500

@app.post('/api/voice')
async def voice(request: Request):
    try:
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
    except Exception as e:
        print(f"Error in voice endpoint: {str(e)}")
        return {"error": str(e)}, 500

if __name__ == "__main__":
    import uvicorn
    print("Starting server...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    ) 