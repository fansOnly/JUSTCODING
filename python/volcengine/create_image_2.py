# coding:utf-8
from __future__ import print_function

from volcengine import visual
from volcengine.visual.VisualService import VisualService

if __name__ == '__main__':
    visual_service = VisualService()

    # call below method if you don't set ak and sk in $HOME/.volc/config
    visual_service.set_ak('AKLTNTZjZjZiM2Q5MDJmNGNkN2I5ZmFjNWNhOGMzMWFkMTY')
    visual_service.set_sk('T1RFd01qUmpPVFpqTmpZek5HWXpNemt5T0Roak1UTTRNell3TmpSbFkyRQ==')
    
    form = {
        "req_key": "high_aes_scheduler_svr_controlnet_v2.0",
        "image_urls": [
            "http://bsddata.oss-cn-hangzhou.aliyuncs.com/virtual_live/temp_file/1743152332008.jpg",
            "https://bsddata.oss-cn-hangzhou.aliyuncs.com/virtual_live/temp_file/1743149654434.jpg"
        ],
        "prompt": "动态视角、酸波、抽象表现主义风格、多彩频率、火焰，炸裂，暴力美学",
        "model_version": "general_controlnet_v2.0",
        "seed": -1,
        "scale": 3,
        "ddim_steps": 16,
        "use_rephraser": False,
        "controlnet_args": [
            {
                "type": "depth",
                "binary_data_index": 0,
                "strength": 0.6
            },
            {
                "type": "canny",
                "binary_data_index": 1,
                "strength": 0.4
            }
        ],
        "return_url": True,
        "logo_info": {
            "add_logo": False,
            "position": 0,
            "language": 0,
            "logo_text_content": "AI生成，谨慎甄别"
        }
    }

    resp = visual_service.cv_process(form)
    print(resp)