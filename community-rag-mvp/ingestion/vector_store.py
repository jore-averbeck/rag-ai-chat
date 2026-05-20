import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)


def store_chunks(chunks, document_name: str):
    """
    Stores document chunks + embeddings in Supabase
    """

    rows = [
        {
            "document_name": document_name,
            "chunk_index": chunk["chunk_index"],
            "content": chunk["text"],
            "source_types": chunk.get("source_types", []),
            "embedding": chunk["embedding"]
        }
        for chunk in chunks
    ]

    return supabase.table("document_chunks").insert(rows).execute()



def match_chunks(query_embedding, match_count: int = 5):
    """
    Calls Supabase pgvector function `match_chunks`
    """

    return supabase.rpc(
        "match_chunks",
        {
            "query_embedding": query_embedding,
            "match_count": match_count
        }
    ).execute()


def search_chunks(query_embedding, match_count: int = 5):
    """
    Clean interface for RAG pipeline (recommended)
    """

    response = match_chunks(query_embedding, match_count)

    return response.data