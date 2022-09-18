const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const keys = require("../private/keys");

const transporter = nodemailer.createTransport(
  sendgrid({ auth: { api_key: keys.sendgridKey } })
);

exports.main = (req, res, next) => {
  res.status(200).json({ message: "Welcome to Topboy Entertainment" });
};

exports.sendMail = (req, res, next) => {
  transporter.sendMail({
    to: "williamlens02@gmail.com",
    from: "nationtopboy@gmail.com",
    subject: "Hello",
    html: "<h1>Text goes here</h1>",
  });
  res.status(200).json({ message: "Email sent successfully" });
};
