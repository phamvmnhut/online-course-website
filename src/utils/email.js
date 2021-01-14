const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1 Create a transporter

  const smtpOptions = process.env.NODE_ENV === 'development'
    ? {
      host: 'smtp.mailtrap.io',
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    }
    : {
      service: 'SendinBlue',
      auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_MASTER_PASSWORD,
      },
    };

  // if using gmail smtp
  // {
  //   service: "gmail",
  //   auth: {
  //     user: process.env.GMAIL_USERNAME,
  //     pass: process.env.GMAIL_PASSWORD,
  //   },
  // }

  const transporter = nodemailer.createTransport(smtpOptions);

/**
 * @param option 
 * name        :  username 
 * mail        :  email
 * subject     : 
 * message     :
 */
  // 2 Define the email options
  const mailOptions = process.env.NODE_ENV === 'development'
    ? {
      from: 'Pham VM Nhut <info@pvmn.io>',
      to: `${options.name} <${options.email}>`,
      subject: options.subject,
      text: options.message,
    }
    : {
      from: process.env.SENDINBLUE_SENDER,
      to: `${options.name} <${options.email}>`,
      subject: options.subject,
      text: options.message,
    };

  // 3 Actually send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
