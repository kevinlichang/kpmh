//create express instance
const express = require('express');
// var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


// Starting Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/index.html', (req, res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// Contact page
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/contact.html'));
});

//Send Message to email
const emailRouter = require('./models/emailRoute.js');
app.use('/send-email-confirm', emailRouter);

// 404 Error Page
// app.use((req, res) =>{
//   res.sendFile(path.join(__dirname + '/404.html'));
// })

//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});