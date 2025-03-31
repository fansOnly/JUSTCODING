import os
from PIL import Image, ImageDraw, ImageFont
import math


def hex_to_rgba(hex_str, alpha=1.0, return_float=False):
    """
    将 HEX 颜色值转换为 RGBA 元组
    :param hex_str: HEX 颜色字符串（支持 #RGB、#RGBA、#RRGGBB、#RRGGBBAA）
    :param alpha: 自定义透明度（浮点数 0.0-1.0 或整数 0-255，默认1.0）
    :param return_float: 是否返回浮点数格式（默认False，返回整数）
    :return: (R, G, B, A) 元组
    """
    # 移除 # 符号并处理缩写格式
    hex_str = hex_str.lstrip('#').lower()
    length = len(hex_str)
    
    # 扩展缩写格式：3/4位 → 6/8位
    if length in (3, 4):
        hex_str = ''.join([c * 2 for c in hex_str])
        length = len(hex_str)
    
    # 根据长度解析 RGB 和 A 通道
    if length == 6:
        r, g, b = (int(hex_str[i:i+2], 16) for i in (0, 2, 4))
        a = alpha  # 使用自定义透明度
    elif length == 8:
        r, g, b = (int(hex_str[i:i+2], 16) for i in (0, 2, 4))
        a = int(hex_str[6:8], 16) / 255  # 提取 HEX 中的透明度并转为浮点数
    else:
        raise ValueError(f"Invalid HEX color: #{hex_str}")
    
    # 处理自定义透明度（兼容整数和浮点数输入）
    if isinstance(alpha, (int, float)):
        if 0 <= alpha <= 1:
            a = alpha
        elif 0 <= alpha <= 255:
            a = alpha / 255
        else:
            raise ValueError("Alpha must be in [0.0, 1.0] or [0, 255]")
    
    # 返回浮点数或整数格式
    if return_float:
        return (r/255, g/255, b/255, a)
    else:
        return (r, g, b, int(a * 255) if a <= 1 else a)


def create_watermark(input_file, output_file, text, font_size, color):
  
  mark_angle = 30 # rotation angle
  mark_space = 75 # space between watermark
  mark_opacity = 0.15 # opacity of watermark
  mark_quality = 90 # quality of watermark
  
  # 读取图片
  image = Image.open(input_file)
  mark = Image.new("RGBA", image.size, (0, 0, 0, 0))

  # 水印文字
  draw = ImageDraw.Draw(mark)
  fill_color = hex_to_rgba(mark_color, mark_opacity)
  font=ImageFont.truetype("/System/Library/Fonts/Arial.ttf", font_size)
  # draw.text((0, 0), mark_content, font=font, fill=fill_color)


  # # 计算斜边长度
  # c = int(math.sqrt(width*width + height*height))
  # """创建满屏的水印"""
  # # 以斜边长度为宽高创建大图（旋转后大图才足以覆盖原图）
  # mark2 = Image.new(mode='RGBA', size=(c, c))
  # y, idx = 0, 0
  # while y < c:
  #     x = -int((mark.size[0] + mark_space)*0.5*idx)
  #     idx = (idx + 1) % 2

  #     while x < c:
  #         mark2.paste(mark, (x, y))
  #         x = x + mark.size[0] + mark_space
  #         y = y + mark.size[1] + mark_space
  
  # mark2 = mark2.rotate(mark_angle)

  # # 平铺倾斜文字
  for y in range(0, image.height*2, mark_space):
      for x in range(0, image.width*2, int(draw.textlength(mark_content, font)) + 100):
          draw.text((x, y), mark_content, font=font, fill=fill_color)
  mark = mark.rotate(mark_angle, expand=1)

  Image.alpha_composite(image.convert('RGBA'), mark)
  # mark.save(output_file, quality=mark_quality)



filename = "2.jpg"
mark_content = "This is a watermark"
mark_size = 35 # font size
mark_color = "#fff" # font color

# create_watermark(filename, "watermark.png", mark_content, mark_size, mark_color)



def add_tilted_watermark(filename, text, angle=30, spacing=200):
  image = Image.open(filename)
  txt_layer = Image.new('RGBA', image.size, (255, 255, 255, 0))
  draw = ImageDraw.Draw(txt_layer)
  font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 50)
  
  # 平铺倾斜文字
  for y in range(0, image.height, spacing):
      for x in range(0, image.width, int(draw.textlength(text, font)) + 100):
          draw.text((x, y), text, font=font, fill=(255, 255, 255, 50))
  txt_layer = txt_layer.rotate(angle, expand=1)
  
  return Image.alpha_composite(image.convert('RGBA'), txt_layer)


add_tilted_watermark('temp.png', 'this is a watermark')