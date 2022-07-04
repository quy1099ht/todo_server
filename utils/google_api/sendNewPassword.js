const sendMailService = require("./gmailService");
const get_mail_html = require("./readHTML");

const sendNewPassword = async (toEmail, new_password) => {
  const options = {
    to: toEmail,
    replyTo: toEmail,
    subject: "This is your new password",
    text: "This email is sent from the command line",
    html: get_mail_html(new_password),
  };

  const messageId = await sendMailService(options);
  return messageId;
};

module.exports = { sendNewPassword };