from ingestion.extractor import extract_elements_from_pdf
from ingestion.chunker import chunk_elements

path = "data/processed/test_downloaded.pdf"

elements = extract_elements_from_pdf(path)

chunks = chunk_elements(elements)

print("\n--- CHUNKS ---\n")

for chunk in chunks[:5]:
    print(chunk)
    print("\n-----\n")

print("Anzahl Chunks:", len(chunks))
