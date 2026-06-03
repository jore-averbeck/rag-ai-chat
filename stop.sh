#!/bin/bash
# ./stop.sh
echo "🧯 Stopping full RAG stack..."


echo "Stopping Backend..."
pkill -f "uvicorn app.main:app" || true


echo "Stopping Frontend..."
pkill -f "next dev" || true


echo "Stopping Ollama..."
pkill -f "ollama serve" || true

echo "All services stopped"