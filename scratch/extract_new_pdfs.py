import subprocess
import sys
import os

try:
    import PyPDF2
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

files = [
    "/Users/lolaricharte/Desktop/Tarification Pierres d'Histoire Domaine de Courances.pdf",
    "/Users/lolaricharte/Desktop/Tarification Homanie Lyons La forêt.pdf"
]

for filename in files:
    output_name = os.path.basename(filename).replace(".pdf", ".txt")
    print(f"Reading {filename}...")
    try:
        reader = PyPDF2.PdfReader(filename)
        with open(output_name, "w", encoding="utf-8") as f:
            for i in range(len(reader.pages)):
                f.write(f"--- Page {i} ---\n")
                f.write(reader.pages[i].extract_text() + "\n")
        print(f"Saved to {output_name}")
    except Exception as e:
        print(f"Error reading {filename}: {e}")
