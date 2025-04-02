# import datetime

# import keyword
# print(f'关键字：{keyword.kwlist)
# print(f'内置函数：{dir(__builtins__)}')

# date_str = datetime.datetime.now().strftime('%H:%M')
# print(date_str)

# print(float(10))

# a_string = 'Hello' + ' ' + "Women Who Code!"
# print(a_string)
# print(f'str[0]: {a_string[0]}')
# print(f'str[1:5]: {a_string[1:5]}')
# print(f'str[2:]: {a_string[2:]}')


# lis = [ "WWCode", 786 , 2.23, 'singapore', 70.2 ]
# print(type(lis))
# print(lis[0][2:])
# lis[4] = 50
# print(lis)
# print(lis[3][:4])


# symbols = '$¢£¥€¤'
# codes = [ord(symbol) for symbol in symbols]
# print(codes)



# t2 = 'Singapore', 1160.5
# print(type(t2))
# t_empty = ()
# print(type(t_empty))


year = input('> 输入年份（四位数）')
print(f'{year}年{(int(year)%4==0 and int(year)%100!=0 or int(year)%400==0) and "是" or "不是"}闰年')