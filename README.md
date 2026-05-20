# 🧠 AI RAG Chat Application

A fullstack AI-powered chat application using Retrieval-Augmented Generation (RAG) with PDF ingestion, semantic search, and real-time streaming responses.

---

## 🚀 Overview

This project is a **RAG-based AI chat system** where users can upload PDF documents and interact with them via a natural language chat interface.

The system extracts knowledge from documents, stores it as chunks, retrieves relevant context, and generates intelligent responses using a local LLM.

---

## ✨ Features

- 📄 Upload and process PDF documents
- 🧠 Retrieval-Augmented Generation (RAG) pipeline
- 🔍 Semantic search over document chunks
- 💬 Chat interface with context-aware answers
- ⚡ Streaming responses (token-by-token output)
- 🗂️ Knowledge base expansion via document ingestion
- 🎯 Multi-turn conversational memory (stateless demo version)

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

### Backend
- FastAPI
- Python
- Uvicorn

### AI / LLM Layer
- Ollama (local LLM inference)
- LLaMA 3
- Custom RAG pipeline

### Retrieval System
- Chunking-based document splitting
- Embedding-based semantic search (custom implementation)
- Context builder for prompt augmentation


## ⚙️ How to Run the Project

### 1. Clone Repository
```bash
git clone git@github.com:jore-averbeck/rag-ai-chat.git
cd rag-ai-chat

cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

uvicorn main:app --reload --port 8000

cd frontend
npm install
npm run dev
