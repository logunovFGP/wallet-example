const nodemailer = require("nodemailer");
const ApplicationError = require('../utils/application-error');
const templateBuilder = require('./template-builder');


let transporter = nodemailer.createTransport({
  host: process.env.MAILING_HOST,
  port: Number.parseInt(process.env.MAILING_PORT),
  pool: true,
  secure: process.env.MAILING_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.MAILING_USERNAME,
    pass: process.env.MAILING_PASSWORD
  }
});


module.exports = async (emailObj, needsAdditionalRecipient, ccEmails) => {
  if (process.env.BLOCK_EMAILS === 'true') {
    return;
  }
  const emailInfo = await templateBuilder(emailObj);
  try {
    await transporter.sendMail({
      from: '"Scandify" <admin@scandify.tk>', // sender address
      to: emailInfo.to, // list of receivers
      cc: ccEmails,
      subject: emailInfo.subject, // Subject line
      text: emailInfo.text, // plain text body,
      replyTo: 'noreply@scandify.tk',
      html: emailInfo.html // html body
    });
  } catch (err) {
    console.log(err);
    throw ApplicationError.MailingError();
  }
};