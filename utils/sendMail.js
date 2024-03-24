const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendMail = async (email, subject, template, data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    // service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.PASS,
    },
  });
  const templatePath = path.join(__dirname, "../views", template);
  const html = await ejs.renderFile(templatePath, data);
  const mailOptions = {
    from: `${process.env.SITE_NAME} ${process.env.EMAIL_USERNAME}`,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
