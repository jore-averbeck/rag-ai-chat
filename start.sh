#!/bin/bash

# ./start.sh
echo "Starting full RAG stack..."


echo "Starting Ollama..."
ollama serve > ollama.log 2>&1 &
OLLAMA_PID=$!

sleep 2

echo " Starting Backend..."

cd community-rag-mvp
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000 > backend.log 2>&1 &
BACKEND_PID=$!

cd ..


echo "Starting Frontend..."

cd rag-ui
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

cd ..

echo "ALL SERVICES STARTED"
echo "--------------------------------"
echo "Ollama PID:  $OLLAMA_PID"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID:$FRONTEND_PID"
echo "--------------------------------"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://127.0.0.1:8000"
echo "Ollama:   http://127.0.0.1:11434"
echo "--------------------------------"

wait