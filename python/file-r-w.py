from collections import Counter

word_list = []
punctuations = ',.!?\，。！？、()【】<>《》=：+-*“”...\n'

with open('1.txt', 'r') as f:
  for line in f:
    for word in line:
      if word not in punctuations:
        word_list.append(word)

word_count = Counter(word_list)

print(word_count)