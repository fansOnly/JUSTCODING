import requests
from bs4 import BeautifulSoup
import random
from time import sleep
import csv
import re

# 爬取链家数据

# 设置 user_agent
user_agent = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
  "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
  "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
  "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
  "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
  "Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)"
]

def create_house_file():
  csv_header=['名称', '小区', '位置', '面积','户型', '朝向', '装修风格',  '楼高', '建筑年代','建筑结构', '总价', '单价', '好房标志', '标签', '关注人数', '发布时间']
  with open('ziroom.csv', 'a+', newline='', encoding='utf-8') as csv_file:
  # with open('ziroom.txt', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(csv_file)
    writer.writerow(csv_header)
    
    for i in range(1, 10):
      print('正在爬取第', i, '页')
      # 休息一下
      wait_time = random.randint(1, 3)
      sleep(wait_time)
      url = f'https://hf.lianjia.com/ershoufang/{i > 1 and f"pg{i}/" or ""}'
      print(f'请求地址: {url}')
      headers = {'User-Agent': random.choice(user_agent)}
      
      try:
        response = requests.get(url, headers=headers)
        # response.encoding = 'utf-8'
        response = response.content.decode('utf-8', 'ignore')
        soup = BeautifulSoup(response, 'lxml')
        house_data = soup.find_all('div', class_='info')
        # print(house_data)
        for info in house_data:
          csv_data = make_house_info(info)
          writer.writerow(csv_data)
          # f.write(str(csv_data) + '\n')
        
      except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
    
    
def make_house_info(info):
  house_name_div = info.find('div', class_='title')
  house_name = house_name_div.find('a').text.strip()
  house_span_div = house_name_div.find('span')
  # print(f'房源名称：{house_name}')
  if house_span_div != None:
    house_recommend = 'Y'
    # print(f'好房标志: {house_span_div.text.strip()}')
  else:
    house_recommend = "N"
    # print('无好房标志')
  
  position = info.find('div', class_='positionInfo').find_all('a')
  community_name = position[0].text.strip()
  district_name = position[1].text.strip()
  # print(f'小区名称：{community_name}')
  # print(f'区域名称：{district_name}')
  
  house_label = info.find('div', class_='houseInfo').text.strip()
  # print(f'房源标签：{house_label}')
  house_label_list = re.split(r'\s*\|\s*', house_label)
  # print(f'房源标签2：{house_label_list}')
  house_type, house_square, house_orientation, house_style, house_floor_num, *other_info = house_label_list
  if len(other_info) > 1:
    house_build_year = other_info[0]
    house_structure = other_info[1]
  else:
    house_build_year = '-'
    house_structure = other_info[0]
  
  follow_info = info.find('div', class_='followInfo').text.strip()
  follow_info_list = re.split(r'\s*/\s*', follow_info)
  house_follow_num = follow_info_list[0]
  house_publish_time = follow_info_list[1]
  # print(f'关注人数：{house_follow_num}')
  # print(f'发布时间：{house_publish_time}')
  
  house_tag_list = info.find('div', class_='tag').find_all('span')
  house_tag_text_list = [tag.text.strip() for tag in house_tag_list]
  house_tag = '|'.join(map(str, house_tag_text_list))
  # print(f'房源标签: {house_tag}')
  
  house_price_div = info.find('div', class_='totalPrice')
  house_price = house_price_div.find('span').text.strip()
  house_price_unit = house_price_div.find_all('i')[1].text.strip()
  # print(f'房源总价：{house_price} {house_price_unit}')
  
  house_unit_price = info.find('div', class_='unitPrice').find('span').text.strip()
  # print(f'房源单价: {house_unit_price}')
  
  # ['名称', '小区', '位置', '面积','户型', '朝向', '装修风格',  '楼高', '建筑年代','建筑结构', '总价', '单价', '好房标志', '标签', '关注人数', '发布时间']
  house_info = [house_name, community_name, district_name, house_square, house_type, house_orientation, house_style, house_floor_num, house_build_year, house_structure, house_price, house_unit_price, house_recommend, house_tag, house_follow_num, house_publish_time]
  return house_info

if __name__ == '__main__':
  create_house_file()