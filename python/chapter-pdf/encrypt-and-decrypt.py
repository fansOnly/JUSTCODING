import os
from PyPDF2 import PdfReader, PdfWriter


def encrypt_pdf(input_file, output_file, password):
  pdf_reader = PdfReader(input_file)
  pdf_writer = PdfWriter()

  print('pages', pdf_reader.pages)

  for index, page in enumerate(pdf_reader.pages):
    pdf_writer.add_page(page)

  # Encrypt the PDF with the given password
  pdf_writer.encrypt(password)

  # Write the encrypted PDF to a file
  with open(output_file, 'wb') as f:
    pdf_writer.write(f)


def decrypt_pdf(input_file, output_file, password):
  pdf_reader = PdfReader(input_file)
  pdf_writer = PdfWriter()

  # Check if the PDF is encrypted
  if pdf_reader.is_encrypted:
    # Decrypt the PDF with the given password
    pdf_reader.decrypt(password)
  
  for index, page in enumerate(pdf_reader.pages):
    pdf_writer.add_page(page)

  # Write the decrypted PDF to a file
  with open(output_file, 'wb') as f:
    pdf_writer.write(f)


filename = 'example.pdf'
filepath = os.path.join(os.getcwd(), filename)
password = '123456'

# Encrypt the PDF
# encrypt_pdf(filepath, 'encrypted.pdf', password)

# Decrypt the PDF
# decrypt_pdf('encrypted.pdf', 'decrypted.pdf', password)

