import xlwings as xw

# connect to the active workbook
# visible=True 表示打开操作Excel过程可见 初次接触可以设置为True，了解其过程
# add_book=False 表示启动app后不用新建个工作簿
# spec 指定WPS Office的路径，作为解析 .xlsx 文件的工具
app = xw.App(visible=True, add_book=False, spec="/Applications/WPS Office.app")
print(f'app: {app}')

# create a new workbook
wb = app.books.add()
print(f'workbook: {wb}')

# create a new sheet
sheet = wb.sheets.add('Sheet1')
print(f'sheet: {sheet}')

# set the value of A1 to 100
sheet.range('A1').value = 100

# save the workbook
wb.save('test.xlsx')

# close the workbook and app
wb.close()
app.quit()


# mac 运行报错，提示找不到WPS Office，解决方法：!!!!