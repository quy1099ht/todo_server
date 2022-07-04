const fs = require("fs");

const get_mail_html = (new_password) => {
  const mail_html = fs.readFileSync("./utils/google_api/mail.html");

  return mail_html.toString().replace("nX@3v3zY", new_password);
};

module.exports = get_mail_html;
