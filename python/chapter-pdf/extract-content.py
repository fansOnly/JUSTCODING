import os
import pdfplumber
import pandas as pd
import re
import fitz


# 提取文字内容
# def extract_text_from_pdf(pdf_file):
#   with pdfplumber.open(pdf_file) as pdf:
#     page = pdf.pages[1]
#     # print(page.extract_text())

# if __name__ == '__main__':
#   pdf_file = os.path.join(os.path.dirname(__file__), 'example.pdf')
#   extract_text_from_pdf(pdf_file)



# 提取表格内容
# def extract_table_from_pdf(pdf_file):
#   with pdfplumber.open(pdf_file) as pdf:
#     # # if one table in page
#     # page = pdf.pages[6]
#     # table = page.extract_table()
#     # print('table:', table)
#     # table_data = pd.DataFrame(table[1:], columns=table[0])
#     # table_data.to_csv('pdf-table.csv', index=False, encoding='utf-8')

#     # if multiple tables in page
#     page = pdf.pages[5]
#     tables = page.extract_tables()
#     print('tables count:', len(tables))
#     for index, table in enumerate(tables):
#       print('table', index+1, ':', table)
#       table_data = pd.DataFrame(table[1:], columns=table[0])
#       table_data.to_csv('pdf-table-{}.csv'.format(index+1), index=False, encoding='utf-8')

# if __name__ == '__main__':
#   pdf_file = os.path.join(os.path.dirname(__file__), 'example.pdf')
#   extract_table_from_pdf(pdf_file)



# 提取图片内容
def extract_image_from_pdf(filepath, output_dir='images'):
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)
  
  check_XObject = r"/Type(?= */XObject)"
  check_Image = r"/Subtype(?= */Image)"
  img_count = 0

  pdf_info = fitz.open(filepath)
  xref_len = pdf_info.xref_length()
  print(f'文件名：{filepath}，页数：{len(pdf_info)}，对象：{xref_len-1}')

  for index in range(1, xref_len):
    text = pdf_info.xref_object(index)

    is_XObject = re.search(check_XObject, text)
    is_Image = re.search(check_Image, text)
    if is_XObject or is_Image:
      img_count += 1
      # 根据索引生成图片
      pix = fitz.Pixmap(pdf_info, index)
      pic_filepath = os.path.join(output_dir, f'img_{img_count}.png')
      # pix.size 可以反映像素多少，简单的色素块该值较低，可以通过设置一个阈值过滤。以阈值 10000 为例过滤
      # if pix.size < 10000:
      #     continue

      # 保存png图片
      if pix.n >= 5:
        # 转换CMYK
        pix = fitz.Pixmap(fitz.csRGB, pix)
      pix.save(pic_filepath)


if __name__ == '__main__':
  pdf_file = os.path.join(os.path.dirname(__file__), 'example.pdf')
  extract_image_from_pdf(pdf_file, 'images')