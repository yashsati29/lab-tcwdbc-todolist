const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('assets'));

app.get('/', function(req, res) {
  const today = new Date();
  const currentDay = today.toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  res.render('list', {
    eCurrentDay: currentDay,
  });
})

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has been started successfully.');
})