import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

bucket = "raw-files"

file_name = "2d740226c58e41ddb8a4b1524f1d29a1.pdf"
path = f"uploads/{file_name}"  # <- wichtig!

local_path = "data/processed/test_downloaded.pdf"

response = supabase.storage.from_(bucket).download(path)

os.makedirs("data/processed", exist_ok=True)

with open(local_path, "wb") as f:
    f.write(response)

print("✅ Download erfolgreich:", local_path)