import os
from PyPDF2 import PdfReader, PdfWriter

def rotate_pdf(input_file, output_file):
  pdf_reader = PdfReader(input_file)
  pdf_writer = PdfWriter()
  page = pdf_reader.pages[0]
  page.rotate(90)
  pdf_writer.add_page(page)
  with open(output_file, 'wb') as f:
    pdf_writer.write(f)

filename = 'example.pdf'
filepath = os.path.join(os.getcwd(), filename)
rotate_pdf(filepath, 'rotated.pdf')