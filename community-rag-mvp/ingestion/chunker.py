def chunk_elements(elements, max_chars=500):
    chunks = []

    current_chunk = ""
    chunk_index = 0

    for el in elements:
        text = el.get("text", "").strip()
        category = el.get("type", "Unknown")

        if not text:
            continue

      
        if len(current_chunk) + len(text) > max_chars:
            chunks.append({
                "chunk_index": chunk_index,
                "text": current_chunk.strip(),
                "source_types": current_types
            })

            chunk_index += 1
            current_chunk = text + "\n"
            current_types = [category]

        else:
            if current_chunk == "":
                current_types = []

            current_chunk += text + "\n"
            current_types.append(category)

  
    if current_chunk:
        chunks.append({
            "chunk_index": chunk_index,
            "text": current_chunk.strip(),
            "source_types": current_types
        })

    return chunks