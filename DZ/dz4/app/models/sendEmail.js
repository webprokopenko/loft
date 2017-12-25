const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports = function (name, from, message, callback) {
    const transporter = nodemailer.createTransport(config.mail.smtp);
  
    const mailOptions = {
      from: `"${name}" <${from}>`,
      to: config.mail.smtp.auth.user,
      subject: config.mail.subject,
      text: message.trim().slice(0, 500) + `\n Отправлено с: <${from}>`
    };
  
    return new Promise(function(resolve, reject) {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
