import glob
import os, fnmatch
import hashlib
import shutil

# print(glob.glob("*.txt"))
# print(glob.glob("*.py"))


# get all files with numbers in their name
# path = os.getcwd()
# pattern = "*[0-9].txt"
# for root, dirs, files in os.walk('.'):
#   for file in files:
#     if fnmatch.fnmatch(file, pattern):
#       print(os.path.join(root, file))


# # find a file by its hash value
# m = hashlib.md5()
# f = open('1.txt', 'rb')
# m.update(f.read())
# f.close()
# hash_value = m.hexdigest()
# print(hash_value)

# # change file content to test hash value
# f = open('1.txt', 'w')
# f.write('test111')
# f.close()

# m = hashlib.md5()
# f = open('1.txt', 'rb')
# m.update(f.read())
# f.close()
# hash_value = m.hexdigest()
# print(hash_value)


# practice 1
# 编写一个程序，遍历一个目录树，查找特定扩展名的文件（诸如.pdf 或.jpg）。不论这些文件的位置在哪里， 将它们拷贝到一个新的文件夹中。
# def find_files(directory, extension, target_directory):
#   if not os.path.exists(target_directory):
#     os.makedirs(target_directory)
#   target_abs_path = os.path.abspath(target_directory)
#   for root, dirs, files in os.walk(directory):
#     # skip target directory
#     root_abs_path = os.path.abspath(root)
#     if root_abs_path == target_abs_path:
#       continue
#     for file in files:
#       if fnmatch.fnmatch(file, '*.' + extension):
#         print(os.path.join(root, file))
#         # copy file to new directory
#         shutil.copy(os.path.join(root, file), target_directory)

# # example usage
# find_files('.', 'py', 'py_files')

# practice 2
# 编写一个程序， 遍历一个目录树， 查找特别大的文件或文件夹， 比方说， 超过100MB 的文件（回忆一下，要获得文件的大小，可以使用 os 模块的 os.path.getsize()）。将这些文件的绝对路径打印到屏幕上。
# def find_large_files(directory, size_limit = 100 * 1024 * 1024):
#   for root, dirs, files in os.walk(directory):
#     for file in files:
#       size = os.path.getsize(os.path.join(root, file))
#       if size > size_limit:
#         print(os.path.join(root, file))

# # example usage
# find_large_files('../', 0.05 * 1024 * 1024)

# practice 3-1
# 编写一个程序， 在一个文件夹中， 找到所有带指定前缀的文件， 诸如 spam001.txt,spam002.txt 等，并定位缺失的编号（例如存在 spam001.txt 和 spam003.txt， 但不存在 spam002.txt）。让该程序对所有后面的文件改名， 消除缺失的编号。作为附加的挑战，编写另一个程序，在一些连续编号的文件中，空出一些编号，以便加入新的文件。
# def find_missing_files(directory, prefix):
#   files = sorted(glob.glob(os.path.join(directory, prefix + '*')))
#   for i in range(1, len(files) + 1):
#     if not os.path.exists(os.path.join(directory, prefix + str(i) + '.txt')):
#       print('Missing file:', prefix + str(i) + '.txt')
  
#   for i in range(1, len(files) + 1):
#     if not os.path.exists(os.path.join(directory, prefix + str(i) + '.txt')):
#       # rename file
#       os.rename(files[i - 1], os.path.join(directory, prefix + str(i) + '.txt'))


# find_missing_files('practice', 'spam00')

# practice 3-2
# 编写一个程序， 在一个文件夹中， 找到所有带指定前缀的文件， 诸如 spam001.txt,spam002.txt 等，在一些连续编号的文件中，空出一些编号，以便加入新的文件。
# def find_place_for_new_file(directory, prefix, new_file_name):
#   files = sorted(glob.glob(os.path.join(directory, prefix + '*')))
#   print(files)
#   for i in range(1, len(files) + 1):
#     file_name = prefix + str(i) + '.txt'
#     if file_name == new_file_name:
#       # remove existing file
#       os.remove(os.path.join(directory, file_name))
      
# # example usage
# find_place_for_new_file('practice', 'spam00', 'spam002.txt')