from fastapi import FastAPI, Request, Response
from langchain_community.llms import Ollama
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.vectorstores import FAISS
from langchain.embeddings import OllamaEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.docstore.document import Document
import os

# For voice synthesis
from TTS.api import TTS as CoquiTTS
import soundfile as sf
import io

# Load your portfolio data (ensure this file exists)
PORTFOLIO_PATH = os.getenv('PORTFOLIO_PATH', 'portfolio.txt')
with open(PORTFOLIO_PATH, encoding='utf-8') as f:
    portfolio_text = f.read()

# Split and embed portfolio
docs = [Document(page_content=chunk) for chunk in CharacterTextSplitter(chunk_size=500, chunk_overlap=50).split_text(portfolio_text)]
embeddings = OllamaEmbeddings(model='nomic-embed-text')
vectorstore = FAISS.from_documents(docs, embeddings)

# Set up LLM and chain with short-term memory (last 3 exchanges)
llm = Ollama(model='llama3')
memory = ConversationBufferWindowMemory(k=3, memory_key='chat_history', return_messages=True)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm, vectorstore.as_retriever(), memory=memory,
    return_source_documents=False
)

# Initialize Coqui TTS (use a high-quality English model)
tts = CoquiTTS(model_name="tts_models/en/vctk/vits")

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

# Voice endpoint: POST /voice {"text": "..."} returns audio/wav
@app.post('/voice')
async def voice(request: Request):
    data = await request.json()
    text = data['text']
    # Synthesize speech
    wav = tts.tts(text=text, speaker=tts.speakers[0], language=tts.languages[0])
    # Write to buffer
    buf = io.BytesIO()
    sf.write(buf, wav, tts.synthesizer.output_sample_rate, format='WAV')
    buf.seek(0)
    return Response(content=buf.read(), media_type='audio/wav') 