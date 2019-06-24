const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String
};

const Item = new mongoose.model('item', itemsSchema);

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

  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {

      const defaultItem = new Item({
        name: 'Welcome to your to do list app!'
      });

      defaultItem.save();

      res.redirect('/');
    } else {

      res.render('list', {
        eCurrentDay: currentDay,
        newListItems: foundItems
      });

    }

  });

})

app.post('/', function(req, res) {

  const itemToAdd = new Item({
    name: req.body.newItem
  })

  itemToAdd.save();

  res.redirect('/');

})

app.post('/delete', function(req, res) {

  Item.deleteOne({
    _id: req.body.checkbox
  }, function(err) {})

  res.redirect('/');

})

app.listen(process.env.PORT || 3000, function() {
  console.log('The server has been started successfully.');
})