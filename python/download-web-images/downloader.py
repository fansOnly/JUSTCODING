import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import os
from urllib.parse import urljoin, urlparse
import argparse
from urllib3.exceptions import InsecureRequestWarning

# 禁用SSL证书警告
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

def download_image(img_url, save_dir):
    """下载单个图片并显示进度条"""
    try:
        # 生成文件名
        parsed_url = urlparse(img_url)
        filename = os.path.basename(parsed_url.path) or "unknown_image.jpg"
        save_path = os.path.join(save_dir, filename)
        
        # 处理已存在文件
        if os.path.exists(save_path):
            print(f"文件已存在，跳过下载: {filename}")
            return

        # 发起请求
        response = requests.get(img_url, stream=True, verify=False)
        response.raise_for_status()
        
        # 获取文件大小
        total_size = int(response.headers.get('content-length', 0))
        chunk_size = 1024  # 1KB

        # 初始化进度条
        progress = tqdm(
            total=total_size,
            unit='B',
            unit_scale=True,
            desc=f"下载 {filename[:20]}",
            bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt} [{elapsed}<{remaining}]"
        )

        # 写入文件
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size):
                if chunk:  # 过滤保持连接的空白块
                    f.write(chunk)
                    progress.update(len(chunk))
        progress.close()

    except Exception as e:
        print(f"\n下载失败: {img_url} - 错误: {str(e)}")

def main():
    # 设置命令行参数
    parser = argparse.ArgumentParser(description="网页图片下载工具")
    parser.add_argument("url", help="目标网页URL")
    parser.add_argument("-d", "--dir", help="保存目录（默认：downloads）", default="downloads")
    args = parser.parse_args()

    # 创建保存目录
    os.makedirs(args.dir, exist_ok=True)

    try:
        # 获取网页内容
        response = requests.get(args.url, verify=False)
        response.raise_for_status()
        
        # 解析图片链接
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img')
        img_urls = [urljoin(args.url, img.get('src')) for img in img_tags if img.get('src')]
        print(f"全部图片链接: {img_urls}")

        print(f"发现 {len(img_urls)} 张图片，开始下载...")

        # 下载所有图片
        for url in img_urls:
            download_image(url, args.dir)

        print("\n所有图片下载完成！保存位置:", os.path.abspath(args.dir))

    except Exception as e:
        print(f"发生错误: {str(e)}")

if __name__ == "__main__":
    main()