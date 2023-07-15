var path = require('path')
const cors = require('cors');
const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

//要有一個 get NLP data
//一個   data
// 一個 update UI 
//在一個 function chain 全部

let userInputValue;

const nlpData = {};

const apiUrl = (userInputValue) => {
  return `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&txt=${userInputValue}`
};

const fetchApi = async (URL) => {
  const res = await fetch(URL, {
    method: 'POST',
    redirect: 'follow',
  });
  try {
    const data = await res.json();
    console.log('ttttttt');
    console.log(data.status.msg);
    // if (data.status.msg === 'OK') {
    //   nlpData.msg = true;
    //   nlpData.text = data.sentence_list[0].text;
    //   nlpData.subjectivity = data.subjectivity;
    //   nlpData.confidence = data.confidence;
    //   nlpData.polarity = data.score_tag;
    //   // console.log(data.sentence_list);
    // } else {
    //   nlpData.msg = false;
    //   nlpData.text = '';
    //   nlpData.subjectivity = '';
    //   nlpData.confidence = '';
    //   nlpData.polarity = '';
    // }
    // console.log(nlpData);
  } catch (error) {
    console.log(error.message);
  }
};

app.get('/getData', function (req, res) {
  const URL = apiUrl(userInputValue);
  fetchApi(URL).then(() => {
    console.log(nlpData);
    res.send(nlpData);
  });
});

app.post('/addTexts', (req, res) => {
  const data = req.body;
  userInputValue = data; //這句需要嗎？？
});



