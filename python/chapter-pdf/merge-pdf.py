import os
from PyPDF2 import PdfReader, PdfWriter

def merge_pdf(filename, input_dir, output_file):
    pdf_writer = PdfWriter()
    list_pdf = os.listdir(input_dir)
    list_pdf.sort(key=lambda x: int(x[:-4].replace(filename[:-4], '')))
    print('pdf files in input directory:', list_pdf)
    for pdf in list_pdf:
      filepath = os.path.join(input_dir, pdf)
      pdf_reader = PdfReader(filepath)
      pages = pdf_reader.pages
      for page in pages:
        pdf_writer.add_page(page)
    
    # save merged pdf
    with open(output_file, 'wb') as out:
        pdf_writer.write(out)
    print('Merged pdf saved to:', output_file)


filename = 'example.pdf'
input_dir = os.path.join(os.getcwd(), 'splits')
output_file = os.path.join(os.getcwd(), 'merged_' +filename)

merge_pdf(filename, input_dir, output_file)