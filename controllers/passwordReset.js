const nanoid = require("nanoid");
const Token = require("../models/token");
const User = require("../models/user");

require("dotenv").config();

const nodemailer = require("nodemailer");

const PasswordReset = (req, res) => {
  if (req.body.email === "") {
    res.status(400).json("Email required");
  }
  User.findOne({ email: req.body.email }).then((dbModel) => {
    if (dbModel === null) {
      res.status(403).json("email not found");
    } else {
      let token = nanoid();
      console.log("token= " + token);
      Token.create({
        userId: dbModel._id,
        token: token,
      });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
          type: 'OAUTH2',
          user: `${process.env.EMAIL_ADDRESS}`,
          clientId: `${process.env.EMAIL_CLIENT_ID}`,
          clientSecret: `${process.env.EMAIL_CLIENT_SECRET}`,
          refreshToken: `${process.env.EMAIL_CLIENT_REFRESH_TOKEN}`,
          accessToken: `${process.env.EMAIL_CLIENT_ACCESS_TOKEN}`,
          expires: 3599
        },
      });
      const emailMessage = {
        from: "admin@fantasybazaar.app",
        to: `${req.body.email}`,
        subject: "Fantasy Bazaar Password Reset Request",
        text:
          "This is your requested password reset link: \n\n" +
          `http://localhost:3000/passwordreset/${token}` +
          "\n\n" +
          "This link will expire in 1 hour and 9 minutes\n\n" +
          "If you did not make this request please ignore this email and your password will remain unchanged.",
      };
      console.log("sending message...")
      transporter.sendMail(emailMessage, (err, response) => {
        if (err) {
          console.log("error sending email " + err);
        } else {
          res.status(200).json("reset email sent");
        }
      });
    }
  });
};

module.exports = PasswordReset;
