from fastapi import FastAPI, Request, Response
from langchain_ollama import Ollama
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import os
import tempfile
import pyttsx3

# Load your portfolio data (ensure this file exists)
PORTFOLIO_PATH = os.path.join(os.path.dirname(__file__), 'portfolio.txt')
with open(PORTFOLIO_PATH, encoding='utf-8') as f:
    portfolio_text = f.read()

# Split and embed portfolio
docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
embeddings = OllamaEmbeddings(model="llama2")
vectorstore = FAISS.from_documents(docs, embeddings)

# Set up LLM and chain with short-term memory (last 3 exchanges)
llm = Ollama(model="llama2")
memory = ConversationBufferWindowMemory(k=3, memory_key='chat_history', return_messages=True)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm, vectorstore.as_retriever(), memory=memory,
    return_source_documents=False
)

app = FastAPI()

@app.post('/chat')
async def chat(request: Request):
    data = await request.json()
    user_message = data['message']
    # Restrict to portfolio: check if answer is relevant, else reply with fallback
    result = qa_chain({'question': user_message, 'chat_history': memory.load_memory_variables({})['chat_history']})
    answer = result['answer']
    if 'Sorry' in answer or 'I do not know' in answer or 'I am not sure' in answer:
        answer = "I'm only able to answer questions about Jananth's portfolio. Please ask something related!"
    return {'answer': answer}

# Voice endpoint: POST /voice {"text": "..."} returns audio/wav using pyttsx3
@app.post('/voice')
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