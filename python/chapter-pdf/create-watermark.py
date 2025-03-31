from PIL import Image, ImageDraw, ImageFont, ImageOps
import math

def create_fullscreen_watermark(base_image_path, text, output_path, angle=30, text_size=40, spacing=150, opacity=128):
    font_path="/System/Library/Fonts/Arial.ttf"
    # 加载原图并转为RGBA模式
    base_img = Image.open(base_image_path).convert("RGBA")
    w, h = base_img.size
    
    # 计算扩展后的画布尺寸（确保旋转后全覆盖）
    diagonal = int(math.sqrt(w**2 + h**2))
    canvas_size = (diagonal * 2, diagonal * 2)  # 创建超大画布
    
    # 创建透明水印画布
    watermark = Image.new("RGBA", canvas_size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(watermark)
    
    # 加载字体并计算文本尺寸
    font = ImageFont.truetype(font_path, text_size)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # 平铺文字计算参数
    step_x = int(text_width * 1.5)  # 横向间隔
    step_y = int(text_height * 3)   # 纵向间隔
    
    # 在画布上重复绘制文字
    for y in range(-diagonal, canvas_size[1], step_y):
        for x in range(-diagonal, canvas_size[0], step_x):
            # 交错排列
            offset = (x + (y % (2 * step_x))) % step_x
            draw.text((x + offset, y), 
                     text, 
                     font=font,
                     fill=(255, 255, 255, opacity))  # 白色半透明
    
    # 旋转水印图层
    rotated_watermark = watermark.rotate(angle, expand=1, resample=Image.BICUBIC)
    
    # 计算居中裁剪位置
    rotated_w, rotated_h = rotated_watermark.size
    crop_box = (
        (rotated_w - w) // 2,
        (rotated_h - h) // 2,
        (rotated_w + w) // 2,
        (rotated_h + h) // 2
    )
    
    # 裁剪并合成
    final_watermark = rotated_watermark.crop(crop_box)
    result = Image.alpha_composite(base_img, final_watermark)
    
    # 保存结果（自动转换格式）
    if output_path.lower().endswith('.jpg'):
        result = result.convert("RGB")
    result.save(output_path)

# 使用示例
create_fullscreen_watermark(
    base_image_path = "2.jpg",
    text = "SAMPLE WATERMARK",
    output_path = "watermark.png",
    angle = 30,          # 倾斜角度
    text_size = 50,      # 文字大小
    spacing = 100,       # 文字间隔
    opacity = 64         # 透明度（0-255）
)