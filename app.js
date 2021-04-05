//create express instance
const express = require('express');
// var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
  })
)


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

// // Send Message to email
// const emailRouter = require('./models/emailRoute.js');
// app.use(emailRouter);

// 404 Error Page
// app.use((req, res) =>{
//   res.sendFile(path.join(__dirname + '/404.html'));
// })
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'kpmhinvestmentsllc@gmail.com',
      pass: 'kpmhemail7711'
  }
});

app.get('/send-message', function(req, res) {
  console.log("sending email...");
  const mailOptions = {
  from: 'kpmhinvestmentsllc@gmail.com',
  to: 'kpmhinvestmentsllc@gmail.com',
  subject: req.query.subject,
  text: req.query.text
  }
  
  console.log(mailOptions)
  
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res);
      res.end("sent")
    }
  })

});



//start server
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});