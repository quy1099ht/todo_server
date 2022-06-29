const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const mailOptionsFormat = (from,to,subject,text) =>{
    return {
        from : from,
        to : to,
        subject : subject,
        text : text
    }
}

module.exports = { transporter }