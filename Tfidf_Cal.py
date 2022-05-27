from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from collections import Counter
from num2words import num2words

import nltk
import os
import string
import numpy as np
import copy
import pandas as pd
import pickle
import re
import math
# import nltk
# nltk.download('punkt')

def sorted_alphanumeric(data):
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ]
    return sorted(data, key=alphanum_key)

folders = './problems'

files=[]
for filename in sorted_alphanumeric(os.listdir(folders)):
    files.append(filename)

# print(files)

dataset = []

c = False

for i in files:
    file = open(os.path.join('./problems/',i), 'r')
    file = open(os.path.join(folders,i), "r", encoding='UTF-8')
    text = file.read().strip()
#     print(text)
    dataset.append(text)
    file.close()

# print(dataset[571])
# print(len(dataset))


def convert_lower_case(data):
    return np.char.lower(data)

def remove_stop_words(data):
    stop_words = stopwords.words('english')
    words = word_tokenize(str(data))
    new_text = ""
    for w in words:
        if w not in stop_words and len(w) > 1:
            new_text = new_text + " " + w
    return new_text

def remove_punctuation(data):
    symbols = "!\"#$%&()*+-./:;<=>?@[\]^_`{|}~\n"
    for i in range(len(symbols)):
        data = np.char.replace(data, symbols[i], ' ')
        data = np.char.replace(data, "  ", " ")
    data = np.char.replace(data, ',', '')
    return data

def remove_apostrophe(data):
    return np.char.replace(data, "'", "")


def stemming(data):
    stemmer = PorterStemmer()

    tokens = word_tokenize(str(data))
    new_text = ""
    for w in tokens:
        new_text = new_text + " " + stemmer.stem(w)
    return new_text

def convert_numbers(data):
    tokens = word_tokenize(str(data))
    new_text = ""
    for w in tokens:
        try:
            w = num2words(int(w))
        except:
            a = 0
        new_text = new_text + " " + w
    new_text = np.char.replace(new_text, "-", " ")
    return new_text

def preprocess(data):
    data = convert_lower_case(data)

    data = remove_punctuation(data) #remove comma seperately
    data = remove_apostrophe(data)
    data = remove_stop_words(data)
#     print(data)
    data = convert_numbers(data)
#     print(data)
    data = stemming(data)
    data = remove_punctuation(data)
    data = convert_numbers(data)
    data = stemming(data) #needed again as we need to stem the words
    data = remove_punctuation(data) #needed again as num2word is giving few hypens and commas fourty-one
    data = remove_stop_words(data) #needed again as num2word is giving stop words 101 - one hundred and one
    return data

processed_text = []

for i in dataset:
    processed_text.append(word_tokenize(str(preprocess(i))))

# print(len(processed_text))

DF = {}

for i in range(1843):
    tokens = processed_text[i]
    for w in tokens:
        try:
            DF[w].add(i)
        except:
            DF[w] = {i}
for i in DF:
    DF[i] = len(DF[i])

# print(DF)

total_vocab_size = len(DF)

total_vocab = [x for x in DF]
# print(total_vocab)
#
# with open("keywords.txt", "w") as f:
#     f.write(total_vocab[0])
# for i in range (1,15076):
#     with open("keywords.txt", "a") as f:
#         f.write('\n')
#         f.write(total_vocab[i])

# with open("DF.txt", "w") as f:
#     f.write(str(DF[total_vocab[0]]))
# for i in range (1,15076):
#     with open("DF.txt", "a") as f:
#         f.write('\n')
#         f.write(str(DF[total_vocab[i]]))


def doc_freq(word):
    c = 0
    try:
        c = DF[word]
    except:
        pass
    return c


doc = 0

tf_idf = {}

for i in range(1843):

    tokens = processed_text[i]

    counter = Counter(tokens)
    words_count = len(tokens)

    for token in np.unique(tokens):
        tf = counter[token] / words_count
        df = doc_freq(token)
        idf = np.log((1843 + 1) / (df + 1))

        tf_idf[doc, token] = tf * idf

    doc += 1

# print(tf_idf)

def cosine_sim(a, b):
    cos_sim=0
#     if(np.linalg.norm(a)>0):
#         if(np.linalg.norm(b)>0):
    cos_sim = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return cos_sim

D = np.zeros((1843, total_vocab_size))
for i in tf_idf:
    try:
        ind = total_vocab.index(i[1])
        D[i[0]][ind] = tf_idf[i]
    except:
        pass

# print(D.shape)

# df=pd.DataFrame(data=D.astype(float))
# df.to_csv('tfidf_matrix.csv',sep=' ',header=False,float_format='%.15f',index=False)

def gen_vector(tokens):
    Q = np.zeros((len(total_vocab)))

    counter = Counter(tokens)
    words_count = len(tokens)

    query_weights = {}

    for token in np.unique(tokens):

        tf = counter[token] / words_count
        df = doc_freq(token)
        idf = math.log((1843 + 1) / (df + 1))

        try:
            ind = total_vocab.index(token)
            Q[ind] = tf * idf
        except:
            pass
    return Q


def cosine_similarity(k, query):
    print("Cosine Similarity")
    preprocessed_query = preprocess(query)
    tokens = word_tokenize(str(preprocessed_query))

    print("\nQuery:", query)
    print("")
    print(tokens)

    d_cosines = []

    query_vector = gen_vector(tokens)
    #     Data=pd.DataFrame(query_vector)
    #     print(Data)
    #     print(np.linalg.norm(query_vector))
    #     print(cosine_sim(query_vector, D[0]))
    for d in D:
        d_cosines.append(cosine_sim(query_vector, d))

    print(d_cosines)

    out = np.array(d_cosines).argsort()[-k:][::-1]

    print("")

    print(out)


#     for i in out:
#         print(i, dataset[i][0])

Q = cosine_similarity(10, "Rooks Defenders")