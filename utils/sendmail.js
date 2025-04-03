const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
        user: "f006aee703cad9",
        pass: "fbc18185d0a9fe",
    },
});
module.exports = {
    sendmail: async function (to, subject, URL) {
        return await transporter.sendMail({
            from: 'phamquangnamhuy1908@gmail.com',
            to: to,
            subject: subject,
            html: `<a href=${URL}>URL</a>`, // html body
        });
    }
}