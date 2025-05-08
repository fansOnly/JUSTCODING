方案1：使用虚拟环境（最佳实践）


1. 创建虚拟环境python3 -m venv my_project_env  # 创建名为my_project_env的隔离环境
2. 激活环境
    * macOS/Linux：source my_project_env/bin/activate  # 激活虚拟环境
    * Windows：my_project_env\Scripts\activate.bat
3. 安装依赖pip install package_name  # 现在可以安全安装任何包
4. 退出环境deactivate  # 完成工作后退出
优势：完全隔离的Python运行时，不同项目可使用不同依赖版本