let express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

emailRouter = express.Router();

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
    console.log('Nodemailer ready')
  }
});

emailRouter.post('/', (req, res, next) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: process.env.THE_EMAIL,
      to: process.env.THE_EMAIL, // receiver email,
      subject: `New Message from ${data.fname} ${data.lname}`,
      text: `${data.message}\nContact Email: ${data.email}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });

});

module.exports = emailRouter;