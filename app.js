//create express instance
const express = require('express');
// var session = require('express-session');
var path = require('path');
require('dotenv').config();
var exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded());

// Starting Page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'KPMH Investments'
  })
});

app.get('/index', (req, res) => {
  res.render('index', {
    title: 'KPMH Investments'
  })
});


// Contact page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact US - KPMH Investments'
  })
});

// Send Message to email
app.use('/emailer', require('./routes/emailRoute'));

// 404 Error Page
// app.use((req, res) =>{
//   res.sendFile(path.join(__dirname + '/404.html'));
// })



//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});