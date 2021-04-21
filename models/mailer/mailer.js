const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

/* {
    from: '"John" <john.doe@email.com>', // sender address
    to: 'peter.smith@email.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
} */
exports.sendEmail = (transportObject) => {

    const host = process.env.MAIL_HOST || ''
    const username = process.env.MAIL_USERNAME || ''
    const password = process.env.MAIL_PASSWORD || ''
    const encryption = process.env.MAIL_ENCRYPTION == 'SSL' ? true : false
    const port = encryption ? 465 : 587
    const sender = process.env.MAIL_SENDER || ''
    const from = `"${sender}" <${username}>`

    transportObject = {...transportObject, from}

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: encryption, // true for 465, false for other ports / flase for 587
        auth: {
            user: username, // generated ethereal user
            pass: password, // generated ethereal password
        },
    })

    return new Promise((resolve, reject) => {
        transporter.sendMail(transportObject)
        .then((info) => {
            resolve({
                messageSent: info.messageId,
                previewURL: nodemailer.getTestMessageUrl(info)
            })
        })
        .catch((error) => reject(error))
    })
}