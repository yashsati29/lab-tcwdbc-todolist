const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

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
    newListItems: items
  });
})

app.post('/', function(req, res) {
  const itemToAdd = req.body.newItem;
  items.push(itemToAdd);
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has been started successfully.');
})