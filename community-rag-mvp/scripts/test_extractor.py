import os
from ingestion.extractor import extract_elements_from_pdf

FILE_PATH = "data/processed/test_downloaded.pdf"

elements = extract_elements_from_pdf(FILE_PATH)

print("\n--- ELEMENTS (AUSZUG) ---\n")
for e in elements[:10]:
    print(e)

print("\n--- ANZAHL ELEMENTE ---")
print(len(elements))