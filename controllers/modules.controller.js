'use strict';
const nodemailer = require('nodemailer');

function Email(email, subject, text) {
  this.email = email;
  this.subject = subject;
  this.text = text;
}

function email(email, subject, text) {
  return new Email(email, subject, text);
}

function sendMail(option) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '66666666666666666',
      pass: '66666666666666666'
    }
  });

  var mailOptions = {
    from: '66666666666666666666666',
    to: option.email,
    subject: option.subject,
    text: option.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return 'Email not send';
    } else {
        return true;
    }
  });
};

function createCustomPssword() {
  let uniqCode = '';
  let dates = new Date().getTime();
  while (dates != 0) {
    let key = dates % 36;
    if (key < 10) {
      uniqCode += key;
    } else {
      uniqCode += String.fromCharCode(key + 55);
    }
    dates = parseInt(dates / 36);
  }
  return uniqCode;
};

module.exports = {
  email,
  createCustomPssword,
  sendMail
};
