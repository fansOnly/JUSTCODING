import os
from pdf2image import convert_from_path, convert_from_bytes

# need to install poppler on computer first
# brew install poppler

def pdf_to_img(filepath, output_dir="images"):
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  images = convert_from_bytes(open(filepath, 'rb').read())
  for i, image in enumerate(images):
    image.save(os.path.join(output_dir, f'pdf_img_{i}.png'), 'PNG')

filename = 'example.pdf'
filepath = os.path.join(os.getcwd(), filename)
pdf_to_img(filepath, output_dir="images")