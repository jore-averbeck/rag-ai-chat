from sentence_transformers import SentenceTransformer


model = SentenceTransformer("BAAI/bge-m3")


def embed_text(text: str):
    """
    Embeds a single text into a vector.
    Used for query embedding.
    """
    embedding = model.encode(
        text,
        normalize_embeddings=True
    )
    return embedding.tolist()


def embed_chunks(chunks):
    """
    Adds embeddings to chunk dicts.
    Used during ingestion.
    """
    texts = [chunk["text"] for chunk in chunks]

    embeddings = model.encode(
        texts,
        normalize_embeddings=True
    )

    enriched_chunks = []

    for chunk, embedding in zip(chunks, embeddings):
        enriched_chunks.append({
            **chunk,
            "embedding": embedding.tolist()
        })

    return enriched_chunks