const nodemailer = require('nodemailer');

function emailVerificationMail(data) {
    process.env.USERNAME
    process.env.APP_PASSWORD
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.APP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.USERNAME,
        to: data,
        subject: 'your phone has been hacked',
        text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { emailVerificationMail }