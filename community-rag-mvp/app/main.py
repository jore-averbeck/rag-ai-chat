from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import os

from rag.rag_engine import RAGEngine

app = FastAPI()

engine = RAGEngine()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/chat")
def chat(request: QueryRequest):
    result = engine.query(request.query)

    return {
        "answer": result.get("answer", ""),
        "sources": result.get("sources", []),
    }


@app.post("/chat/stream")
def chat_stream(request: QueryRequest):

    def generate():
        for chunk in engine.stream_query(request.query):
            yield chunk

    return StreamingResponse(generate(), media_type="text/plain")


@app.post("/upload")
async def upload(file: UploadFile = File(...)):

    print("📄 FILE RECEIVED:", file.filename)

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {
        "status": "uploaded",
        "filename": file.filename,
    }