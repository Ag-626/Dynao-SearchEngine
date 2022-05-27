import time
from selenium import webdriver
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import re
from nltk.corpus import stopwords

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("https://google.com")
time.sleep(5)


all_ques = []
problem_rating =[]
for x in range (1, 14):
   driver.get("https://codeforces.com/problemset/page/"+str(x)+"?tags=data+structures")
   time.sleep(5)
   html = driver.page_source
   soup = BeautifulSoup(html, 'html.parser')
   all_ques_tr = soup.findAll("tr")

   for ques in all_ques_tr:
        try:
           problem_rating.append(ques.findAll("span", {"class": "ProblemRating"})[0].text)
           all_ques.append(ques.findAll("div",{"style": "float: left;"})[0].find("a"))
        except Exception as e:
             pass
# #
# # #
# # #
urls = []
titles = []
# # #
for ques in all_ques:
   urls.append("https://www.codeforces.com"+ques['href'])
   titles.append(ques.text.strip())
#

with open("problem_urls.txt", "w+") as f:
    f.write('\n'.join(urls))

with open("problem_titles.txt", "w+") as f:
  	f.write('\n'.join(titles))

with open("problem_rating.txt", "w+") as f:
     f.write('\n'.join(problem_rating))


# driver.get("https://www.codeforces.com/problemset/problem/538/F")
# time.sleep(5)
# html = driver.page_source
# soup = BeautifulSoup(html, 'html.parser')
# #
# problem_text = soup.find('div', {"class": "problem-statement"}).text
# problem_text = problem_text.replace('\n', ', ')
# problem_text = problem_text.encode(encoding="ascii",errors="replace")
# #
# problem_text = str(problem_text)
# print(problem_text)



# urls = ["https://www.codechef.com/problems/XYSTR",
#         "https://www.codechef.com/problems/SUBINC"]
cnt = 0
for url in urls:
      cnt += 1
      if cnt < 988:
         continue
      driver.get(url)

      time.sleep(5)
      html = driver.page_source
      soup = BeautifulSoup(html, 'html.parser')
      problem_text = soup.find('div', {"class": "problem-statement"}).get_text()
      problem_text = problem_text.replace('\n', ', ')
      problem_text = problem_text.encode(encoding="ascii",errors="replace")
      problem_text = str(problem_text)

with open("problem987.txt", "w+") as f:
          f.write(problem_text)

# stop_words = stopwords.words('english')
# print(stop_words);
# print(len(stop_words))