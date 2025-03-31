import os
from PyPDF2 import PdfReader, PdfWriter

def split_pdf(filename, input_file, output_dir, step=5):
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  reader = PdfReader(open(input_file, "rb"))
  pages = len(reader.pages) 
  print("Total Pages: ", pages)

  for page in range(0, pages, step):
    output = PdfWriter()
    for index in range(page, page+step):
      if index < pages:
        output.add_page(reader.pages[index])
    
    # save the output file
    output_filename = os.path.join(output_dir, f"{filename.split('.')[0]}{page+1}.pdf")
    with open(output_filename, "wb") as outputStream:
      output.write(outputStream)

    print(f"Page {page+1}-{page+step} saved to {output_filename}")
  
  print('files saved to', output_dir)


filename = 'example.pdf'
filepath = os.path.join(os.getcwd(), filename)
output_dir = os.path.join(os.getcwd(), 'splits')

split_pdf(filename, filepath, output_dir)