const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/search", (req, res) => {
  const query = req.query;

  const question = query.question;

  if (question == "") {
    res.render("Fail");
  }
  // var fs = require('fs');

  const fs = require("fs");
  const { exit, mainModule } = require("process");

  var strings = "";
  var keyword = "";
  var keywords = [];
  var df = [];
  var problem_urls = [];
  var problem_titles = [];
  var problem_statements = [];

  fs.readFile("./Problem_Statements.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    strings = data.toString();
    for (var i = 0; i < strings.length; i++) {
      if (strings[i] == "\n") {
        keyword = keyword.replace(/[\r\n]+/gm, "");
        problem_statements.push(keyword);
        keyword = "";
      } else {
        keyword = keyword.concat(strings[i]);
      }
    }
    keyword = keyword.replace(/[\r\n]+/gm, "");
    problem_statements.push(keyword);
    keyword = "";
  });

  // keyword = "";

  fs.readFile("./problem_titles.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    strings = data.toString();
    for (var i = 0; i < strings.length; i++) {
      if (strings[i] == "\n") {
        keyword = keyword.replace(/[\r\n]+/gm, "");
        problem_titles.push(keyword);
        keyword = "";
      } else {
        keyword = keyword.concat(strings[i]);
      }
    }
    keyword = keyword.replace(/[\r\n]+/gm, "");
    problem_titles.push(keyword);
    keyword = "";
  });

  // keyword = "";

  fs.readFile("./problem_urls.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    strings = data.toString();
    for (var i = 0; i < strings.length; i++) {
      if (strings[i] == "\n") {
        keyword = keyword.replace(/[\r\n]+/gm, "");
        problem_urls.push(keyword);
        keyword = "";
      } else {
        keyword = keyword.concat(strings[i]);
      }
    }
    keyword = keyword.replace(/[\r\n]+/gm, "");
    problem_urls.push(keyword);
    keyword = "";
  });

  // keyword = "";

  fs.readFile("./keywords.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    strings = data.toString();
    for (var i = 0; i < strings.length; i++) {
      if (strings[i] == "\n") {
        keyword = keyword.replace(/[\r\n]+/gm, "");
        keywords.push(keyword);
        keyword = "";
      } else {
        keyword = keyword.concat(strings[i]);
      }
    }
    keyword = keyword.replace(/[\r\n]+/gm, "");
    keywords.push(keyword);
    keyword = "";
  });

  // keyword = "";

  fs.readFile("./DF.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    strings = data.toString();
    for (var i = 0; i < strings.length; i++) {
      if (strings[i] == "\n") {
        keyword = keyword.replace(/[\r\n]+/gm, "");
        df.push(parseInt(keyword));
        keyword = "";
      } else {
        keyword = keyword.concat(strings[i]);
      }
    }
    keyword = keyword.replace(/[\r\n]+/gm, "");
    df.push(parseInt(keyword));
    keyword = "";
  });

  let string = "";
  let tfidf = [];
  let array = [];

  for (var i = 0; i < 1843; i++) {
    for (var j = 0; j < 15076; j++) tfidf.push(0);
    array.push(tfidf);
    tfidf = [];
  }
  // console.log(array);
  let row = "";
  let val = "";

  fs.readFile("./tfidf_mat.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    string = data.toString();
    for (var i = 0; i < string.length; i++) {
      if (string[i] == "\n") {
        row = row.replace(/[\r\n]+/gm, "");
        for (var j = 0; j < row.length; j++) {
          if (row[j] == " ") {
            tfidf.push(parseInt(val));
            val = "";
          } else {
            val = val.concat(row[j]);
          }
        }
        tfidf.push(parseFloat(val));
        array[tfidf[0]][tfidf[1]] = tfidf[2];
        tfidf = [];
        row = "";
        val = "";
      } else {
        row = row.concat(string[i]);
      }
    }
    row = row.replace(/[\r\n]+/gm, "");
    // console.log(row);
    // console.log(row[0]);
    // console.log(row[row.length - 1]);
    for (var j = 0; j < row.length; j++) {
      if (row[j] == " ") {
        // console.log(val);
        tfidf.push(parseInt(val));
        val = "";
      } else {
        val = val.concat(row[j]);
      }
    }
    tfidf.push(parseFloat(val));
    // console.log(tfidf[0]);
    // console.log(tfidf[1]);
    // console.log(tfidf[2]);
    array[tfidf[0]][tfidf[1]] = tfidf[2];
    tfidf = [];
    row = "";
    // console.log(array[0][25]);
    // console.log(array[1][106]);
    // console.log(array[1][6]);
    // console.log(array[2][52]);
    // console.log(array[0][678]);
  });
  // console.log(array);
  // function csvToArray(csv) {
  //   rows = csv.split("\n");
  //   console.log(rows)
  //   // for (var j = 0; j < rows.length; j++) {
  //   //   row = rows[j];
  //   //   for (var i = 0; i < row.length; i++) {
  //   //     if (row[i] == " ") {
  //   //       tfidf.push(parseFloat(string));
  //   //       string = "";
  //   //     } else {
  //   //       string = string.concat(row[i]);
  //   //     }
  //   //   }
  //   //   tfidf.push(parseFloat(string));
  //   //   console.log(tfidf[0]);
  //   //   console.log(tfidf[1]);
  //   //   console.log(tfidf[2]);
  //   //   tfidf = [];
  //   // }
  //   // return tf_idf;
  // }
  // var array;
  // fs.readFile("./tfidf_mat.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   var csv = data.toString();

  //   array = csvToArray(csv);
  //   // console.log(array);
  // });

  let doc_freq = new Map();
  setTimeout(function () {
    for (var i = 0; i < 15076; i++) {
      doc_freq.set(keywords[i], df[i]);
    }
    // console.log(doc_freq);

    function calculateMagnitude(vector) {
      let magnitude = 0;
      for (let i = 0; i < vector.length; i++) {
        if (isNaN(vector[i]) && vector[i] > 0) {
          magnitude += 0;
        } else {
          magnitude += vector[i] * vector[i];
        }
      }
      return Math.sqrt(magnitude);
    }

    function calculateTermFrequency(term, doc) {
      let numOccurences = 0;
      for (let i = 0; i < doc.length; i++) {
        if (doc[i].toLowerCase() == term.toLowerCase()) {
          numOccurences++;
        }
      }
      return (numOccurences * 1.0) / doc.length;
    }

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

    // var s=;
    const { StemmerEn, StopwordsEn } = require("@nlpjs/lang-en");

    const stemmer = new StemmerEn();
    stemmer.stopwords = new StopwordsEn();
    const input = question;
    // console.log(stemmer.tokenizeAndStem(input, false));
    // output: ['develop']
    var q = stemmer.tokenizeAndStem(input, false);

    let tf_idf_query = createVectorSpaceModel(
      stemmer.tokenizeAndStem(input, false)
    );
    // console.log(tf_idf_query);
    let ranking = [];
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

    // }
    ranking.sort((a, b) => {
      return b.similarityIndex - a.similarityIndex;
    });

    let result = [];
    for (let i = 0; i < 10; i++) {
      result.push({
        title: problem_titles[ranking[i].index],
        url: problem_urls[ranking[i].index],
        statement: problem_statements[ranking[i].index],
      });
    }
    // console.log(result);
    res.render("search", { result: result, question: question });
  }, 5000);
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
