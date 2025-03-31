import os
from copy import copy
from PyPDF2 import PdfReader, PdfWriter


def add_watermark(filepath, output_path, watermark_path):
  # get watermark pdf file object
  watermark = PdfReader(watermark_path)
  watermark_page = watermark.pages[0]

  pdf_reader = PdfReader(filepath)
  pdf_writer = PdfWriter()

  # add watermark to each page
  for index, page in enumerate(pdf_reader.pages):
    # 封面页不加水印
    if index == 0:
      new_page = page
    else:
      new_page = copy(watermark_page)
      new_page.merge_page(page)
    pdf_writer.add_page(new_page)

  # save watermarked pdf file
  with open(output_path, 'wb') as output_file:
    pdf_writer.write(output_file)


filename = 'example.pdf'
filepath = os.path.join(os.getcwd(), filename)
watermark_path = os.path.join(os.getcwd(), 'watermark.pdf')
add_watermark(filepath, 'watermarked.pdf', watermark_path)