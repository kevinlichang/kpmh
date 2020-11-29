var express = require("express");
var nodemailer = require('nodemailer');

emailRouter = express.Router();


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'expert.finder.c2c@gmail.com',
      pass: 'coast2coastemail'
  }
});

emailRouter.get('/send-email-confirm', function(req, res) {
  const mailOptions = {
  from: 'expert.finder.c2c@gmail.com',
  to : req.query.to,
  subject : req.query.subject,
  text : req.query.text
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

module.exports = emailRouter;