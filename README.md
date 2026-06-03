
# AI RAG Chat Application

A fullstack AI-powered chat application using Retrieval-Augmented Generation (RAG) with PDF ingestion, semantic search, and real-time streaming responses.

---

# 🚀 Overview

This project is a RAG-based AI chat system where users can upload PDF documents and interact with them via a natural language chat interface.

The system extracts knowledge from documents, stores it as chunks, retrieves relevant context, and generates intelligent responses using a local LLM (Ollama).

---

# ✨ Features

- 📄 Upload and process PDF documents
- 🧠 Retrieval-Augmented Generation (RAG) pipeline
- 🔍 Semantic search over document chunks
- 💬 Chat interface with context-aware answers
- ⚡ Streaming responses (token-by-token)
- 🗂️ Knowledge base via document ingestion
- 🎯 Multi-turn conversational interaction

---

# 🧱 Tech Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

## Backend
- FastAPI
- Python
- Uvicorn

## AI / LLM Layer
- Ollama (local LLM inference)
- LLaMA 3
- Custom RAG pipeline

## Retrieval System
- Chunking-based document splitting
- Embedding-based semantic search
- Context builder for prompt augmentation

---

# ⚙️ How to Run the Project

## 🚀 Start everything (recommended)

From the project root:

```bash
./start.sh

🚀 This starts:

🧠 Ollama (LLM runtime)
⚙️ FastAPI backend
🎨 Next.js frontend


## 🧯 Stop everything

From the project root:

```bash
./stop.sh

This stops:

🧠 Ollama
⚙️ FastAPI backend
🎨 Next.js frontend

# Services:

Frontend: http://localhost:3000
Backend: http://127.0.0.1:8000
API Docs: http://127.0.0.1:8000/docs
Ollama: http://127.0.0.1:11434