const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.get('/', function(req, res) {
  res.render('list');
})

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has been started successfully.');
})