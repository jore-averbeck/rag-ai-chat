from ingestion.embedder import embed_text
from ingestion.vector_store import match_chunks


def search(query: str, top_k: int = 5):
    query_embedding = embed_text(query)

    response = match_chunks(
        query_embedding=query_embedding,
        match_count=top_k
    )

    return response.data