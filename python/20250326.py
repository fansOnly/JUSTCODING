import shutil
import os
# import send2trash

# send2trash.send2trash('1.txt')

# # create a new directory
# os.mkdir('new_dir')

# # copy a file to the new directory
# shutil.copy('1.txt', 'new_dir')


# shutil.copytree('new_dir', 'new_dir_copy')

# shutil.move('new_dir_copy', 'new_dir')


# os.unlink(os.path.join('new_dir', '1.txt'))

# os.mkdir('new_dir')
# os.chdir('new_dir')
# print(os.getcwd())
# os.rmdir('new_dir')



for foldername, subfolders, filenames in os.walk('.'):
    print('The current folder is ' + foldername)

    for subfolder in subfolders:
        print('SUBFOLDER OF ' + foldername + ': ' + subfolder)

    for filename in filenames:
        print('FILE INSIDE ' + foldername + ': ' + filename)

    print('')