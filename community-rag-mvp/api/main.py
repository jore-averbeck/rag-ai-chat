from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from pydantic import BaseModel

import os

from rag.rag_engine import RAGEngine

app = FastAPI()

engine = RAGEngine()


# =====================================================
# CORS
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# REQUEST MODEL
# =====================================================
class QueryRequest(BaseModel):
    query: str


# =====================================================
# HEALTHCHECK
# =====================================================
@app.get("/")
def root():
    return {"status": "ok"}


# =====================================================
# NORMAL CHAT
# =====================================================
@app.post("/chat")
def chat(request: QueryRequest):

    try:
        result = engine.query(request.query)

        return {
            "answer": result.get("answer", ""),
            "sources": result.get("sources", []),
        }

    except Exception as e:
        return {"error": str(e)}


# =====================================================
# STREAMING CHAT
# =====================================================
@app.post("/chat/stream")
async def chat_stream(request: QueryRequest):

    def generate():

        for chunk in engine.stream_query(request.query):
            yield chunk

    return StreamingResponse(
        generate(),
        media_type="text/plain",
    )


# =====================================================
# PDF UPLOAD
# =====================================================
@app.post("/upload")
async def upload(file: UploadFile = File(...)):

    print("📄 FILE RECEIVED:", file.filename)

    contents = await file.read()

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(contents)

    return {
        "filename": file.filename,
        "status": "uploaded",
    }