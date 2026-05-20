import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def download_file_from_supabase(bucket: str, path: str, local_path: str):
    """
    Lädt eine Datei aus Supabase Storage herunter
    und speichert sie lokal.
    """

    try:
        print(f"\n🔍 Suche Datei:")
        print(f"Bucket: {bucket}")
        print(f"Pfad: {path}")

        response = supabase.storage.from_(bucket).download(path)

        os.makedirs(os.path.dirname(local_path), exist_ok=True)

        with open(local_path, "wb") as f:
            f.write(response)

        print(f"\n✅ Datei gespeichert:")
        print(local_path)

        print(f"\n📦 Dateigröße:")
        print(os.path.getsize(local_path), "Bytes")

        return local_path

    except Exception as e:
        print("\n❌ Download fehlgeschlagen")
        print(e)


download_file_from_supabase(
    bucket="raw-files",
    path="uploads/e175561d9df9488d91fafe4570da56a1.pdf",
    local_path="data/processed/test.pdf"
)