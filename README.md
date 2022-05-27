# Dynao-SearchEngine
## Introduction.
**Dynao Search Engine** is a search engine that uses Tf-idf Algorithm to find out the result. TF-IDF stands for **“Term Frequency — Inverse Document Frequency”**. This is a technique to quantify words in a set of documents. We generally compute a score for each word to signify its importance in the document and corpus. This method is a widely used technique in Information Retrieval and Text Mining. The implementation allows one to instantiate a corpus of documents and compute their similarity relative to an input query and/or document. Using this measure of similarity one can compute which document in their corpus is most relevant to a particular query and/or input document.
## Background.
The search engine implementation is based on the vector space model wherein each document is tokenized into a vector who's indices correspond to a unique term in an input query/document. Subsequently, we caclulate the TF-IDF for each term formula in the document vector, where TF-IDF is defined to be: <br> <br>
**Term Frequency** measures the frequency of a word in a document, **tf(t,d) = count of t in d / number of words in d**. <br> <br> **Inverse document frequency** is the inverse of the document frequency which measures the informativeness of term t, **idf(t) = log(N/(df + 1))**. <br> <br>
Finally, by taking a multiplicative value of TF and IDF, we get the <br> **TF-IDF score = tf-idf(t, d) = tf(t, d) * log(N/(df + 1)).** <br> <br>
Once we define TF-IDF vectors formula for each of the documents in our corpus, we calculate their similarity to a query vector formula to be: <br>
**similarity = v<sub>i</sub>.q<sub>i</sub>/(|v<sub>i</sub>|.|q<sub>i</sub>|)**. <br> <br>
Ranking the similarity measure for each document, one can determine which is the most relevant to a given query.
## Web Scraping.
To search on the dataset, we scrap the problems from platform like codeforces, codechef etc. The code for that is given below: <br>

      for url in urls:
      cnt += 1
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
## Preprocessing.
Preprocessing is one of the major steps when we are dealing with any kind of text model. Few mandatory preprocessing are: converting to lowercase, removing punctuation, removing stop words, lemmatization/stemming and converting numbers to words.
#### Lower Case Conversion.
With the help of code `toLowerCase()` the character is converted to lower case.
#### StopWords and Stemming.
      const { StemmerEn, StopwordsEn } = require("@nlpjs/lang-en"); 
      const stemmer = new StemmerEn();
      stemmer.stopwords = new StopwordsEn();
      const input = question;
      var q = stemmer.tokenizeAndStem(input, false);
#### Converting Numbers to words.
With the help of below code, the number like 2 can be converted to two and 25 to twenty five. <br>
``` JavaScript
  let ans = ""; 
  let split = questions.split(" ");
  let word; 
  for (var i = 0; i < split.length; i++) {
    if (isNaN(split[i])) {
      ans = ans.concat(split[i]); 
      ans = ans.concat(" "); 
    } else { 
      word = inWords(parseInt(split[i])); 
      ans = ans.concat(word); 
    } 
  } 
  
```
## Document Frequency.
In order to calculate the idf value of the word we need to find the document frequency of the that word. Document Frequency stands for number of documents in which the given word appear. This is calculated with the help of following code: <br>
``` python
for i in range(1843):
    tokens = processed_text[i]
    for w in tokens:
        try:
            DF[w].add(i)
        except:
            DF[w] = {i}
for i in DF:
    DF[i] = len(DF[i])
```
## Tf-idf Matrix
In order to find the Tf-idf matrix of the corpus we use the python code. Before passing the corpus for calculation of Tf-idf Matrix, the corpus was preprocessed using the above preprocessor method. The python code for tf-idf matrix calculation is : <br>
``` Python
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
    
  ```
## Tf-idf Calculation of the Query.
In order to find the relevant documents for the given query, we will do cosine similarity. We will find the tf-idf value vector for the query and will do the dot product with tf-idf value of each document, the highest values will be the most relevant result. The code for the same is :
``` JavaScript
 function createVectorSpaceModel(query) {
    query = Array.isArray(query) ? query : query.split(" ");
    let termFrequencyModel = new Map();
    let tidf_query = new Map();
    for (let i = 0; i < query.length; i++) {
      // termFrequencyModel.set(query[i], calculateTermFrequency(query[i], query));
      for (let j = 0; j < keywords.length; j++) {
        if (query[i].toLowerCase() == keywords[j].toLowerCase()) {
          var tidf_value =
            calculateTermFrequency(query[i], query) *
            Math.log((1843 + 1) / (df[j] + 1));
          tidf_query.set(query[i], tidf_value);
        }
      }
    }
    return tidf_query;
  }

```
## Cosine Similarity.
The cosine similarity help us to find which documents in their corpus is most relevant to a particular query and/or input document. This can be calculated using following code: <br>
``` JavaScript
  for (let i = 0; i < array.length; i++) {
    var si = 0;
    for (let k = 0; k < q.length; k++) {
      for (let j = 0; j < keywords.length; j++) {
        if (q[k].toLowerCase() == keywords[j].toLowerCase()) {
          var toAdd = tf_idf_query.get(q[k]) * array[i][j];
          if (isNaN(toAdd)) {
            si += 0;
          } else {
            si += toAdd;
          }
        }
      }
    }
    // let query_mag = calculateMagnitude(q);
    let doc_mag = calculateMagnitude(array[i]);
    let similarity = (1.0 * si) / (q.length * doc_mag);
    ranking.push({
      similarityIndex: similarity,
      index: i,
    });
  }
```
## Result 
After doing the cosine similarity we find out the top 10 relevant documents for the given query and display on the website. The code to display the result is:
``` JavaScript
  let result = [];
  for (let i = 0; i < 10; i++) {
    if (ranking[i].index + 1 <= 983) {
      keyword = fs
        .readFileSync(
          "problem1/problem" + String(ranking[i].index + 1) + ".txt"
        )
        .toString();
    } else {
      keyword = fs
        .readFileSync(
          "problem2/problem" + String(ranking[i].index + 1) + ".txt"
        )
        .toString();
    }
    result.push({
      title: problem_titles[ranking[i].index],
      url: problem_urls[ranking[i].index],
      statement: keyword,
    });
  }
  // console.log(result);
  res.render("search", { result: result, question: questions });
});
```
## Conclusion
So, this is how Dynao search engine find out the top 10 relevant documents for the given query. By preprocessing, the accuracy of the search increases and it become fast. Cosine Similarity also help to increase the efficency of the search engine.

