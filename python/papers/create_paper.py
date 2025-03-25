
import random
import os
import json

# 读取题目
def get_all_subjects():
  file_path = 'subjects.json'
  try:
    with open(file_path, 'r', encoding='utf-8') as file:
      subjects = json.load(file)
      # print(subjects)
      return subjects
  except FileNotFoundError:
    print(f"错误：文件 {file_path} 不存在！")
  except json.JSONDecodeError:
      print(f"错误：文件 {file_path} 不是有效的 JSON 格式！")
  except Exception as e:
      print(f"未知错误：{e}")

# 创建 10 份不同的测试试卷，每份试卷包含 50 道题目，每道题目有 4 个选项，每道题目有 1 个正确答案。
# 试卷的题目内容随机，试卷的答案随机
def create_test_paper(paper_num=10, question_num=50):
  for k in range(paper_num):
    print("试卷", k+1)
    # 定义试卷题目和答案
    question_file = open("questions_"+str(k+1)+".txt", "w")
    answer_file = open("answers_"+str(k+1)+".txt", "w")

    # 打乱题目顺序
    subjects = get_all_subjects()
    question_list = list(subjects.items())
    random.shuffle(question_list)

    # print(question_list)

    for i in range(question_num):
      question, answers = question_list[i]
      correct = answers[0]
      
      # 生成错误选项（需保证数据包含足够错误选项）
      wrongs = answers[1:] if len(answers) >=4 else random.sample(get_all_wrongs(), 3)
      options = [correct] + wrongs
      random.shuffle(options)
      
      # 写入题目
      question_file.write(f"{i+1}. {question}\n")
      for j, opt in enumerate(options):
          question_file.write(f"   {chr(65+j)}. {opt}\n")
      
      # 记录答案
      answer_letter = chr(65 + options.index(correct))
      answer_file.write(f"{i+1}. {answer_letter}\n")

    # 关闭文件
    question_file.close()
    answer_file.close()

# 清空旧试卷和答案
def clear_test_paper():
  for file in os.listdir():
    if file.startswith("questions_") or file.startswith("answers_"):
      os.remove(file)

# 创建 10 份测试试卷
clear_test_paper()
create_test_paper(2)