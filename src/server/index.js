var path = require('path')
const cors = require('cors');
const express = require('express')
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
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/getData', (req, res) => {

  const texts = req.query.texts;
  const  url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&txt=${encodeURIComponent(texts)}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data); 
      console.log(data.status);
      res.json(data);
    })
    .catch(error => console.log('error', error));

});