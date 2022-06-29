const { transporter } = require("../utils/mail_transporter")

var mailOptions = {
  from: process.env.EMAIL,
  to: 'quy1099ht@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
exports.sendForgotPasswordMail = () =>{
    return transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
}