const nodemailer = require('nodemailer');

function emailVerificationMail(data, url) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_USERNAME,
            pass: process.env.APP_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.APP_USERNAME,
        to: data,
        subject: 'Email Verification',
        html:`<div><div>That was easy!</div><div>${url}</div></div>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { emailVerificationMail };