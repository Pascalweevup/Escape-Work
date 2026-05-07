import subprocess
import sys
import os

try:
    import PyPDF2
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

files = [
    "/Users/lolaricharte/Desktop/Tarification Pierres d'Histoire Domaine de Courances (x12).pdf",
    "/Users/lolaricharte/Desktop/Tarification Homanie Lyons La forêt (x12).pdf"
]

output_file = "extracted_data.txt"

with open(output_file, "w") as f:
    for filename in files:
        f.write(f"========== FILE: {os.path.basename(filename)} ==========\n")
        try:
            reader = PyPDF2.PdfReader(filename)
            for i in range(len(reader.pages)):
                f.write(f"--- Page {i} ---\n")
                text = reader.pages[i].extract_text()
                f.write(text + "\n")
        except Exception as e:
            f.write(f"Error reading PDF {filename}: {e}\n")
        f.write("\n\n")

print(f"Extraction complete. Check {output_file}")
