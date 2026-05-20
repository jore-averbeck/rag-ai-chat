import os
from uuid import uuid4

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from supabase import Client, create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_BUCKET = os.getenv("SUPABASE_BUCKET", "raw-files")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_URL oder SUPABASE_KEY fehlt in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="Community RAG MVP")


@app.get("/")
def root():
    return {"status": "Community RAG MVP ready 🚀"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Datei ist leer")

        suffix = os.path.splitext(file.filename or "")[1]
        storage_path = f"uploads/{uuid4().hex}{suffix}"

        result = supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=storage_path,
            file=content,
            file_options={
                "content-type": file.content_type or "application/octet-stream",
                "upsert": "false",
            },
        )

        return {
            "status": "uploaded",
            "bucket": SUPABASE_BUCKET,
            "path": storage_path,
            "filename": file.filename,
            "content_type": file.content_type,
            "supabase_result": str(result),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload fehlgeschlagen: {e}")