//create express instance
const express = require('express');
var path = require('path');
require('dotenv').config();

const passport = require('passport');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/firstDatabase', 
  { useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

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

app.get('/resources', (req, res) => {
  res.render('resources', {
    title: 'Resources - KPMH Investments'
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