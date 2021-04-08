var express = require("express");
var nodemailer = require('nodemailer');

emailRouter = express.Router();
console.log("from emailRoute.js")

const transport = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.THE_EMAIL,
    pass: process.env.THE_PASSWORD
  }
}

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if(error) {
    console.error(error)
  } else {
    console.log('users ready to mail myself')
  }
});

emailRouter.post('/', (req, res, next) => {
  const mailOptions = {
  from: process.env.THE_EMAIL,
  to : process.env.THE_EMAIL,
  subject : req.body.subject,
  text : req.body.text
  }
  
  console.log(mailOptions)
  
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })

});

module.exports = emailRouter;