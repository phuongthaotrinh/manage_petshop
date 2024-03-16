import SMTPTransport from 'nodemailer/lib/smtp-transport'
import transporter from '../../configs/nodemailer.config'

export const sendMail = async ({ to, subject, html }) =>
    await transporter.sendMail(
        {
            from: {
                address: process.env.AUTH_EMAIL,
                name: 'PETSHOP'
},
to: to,
    subject: subject,
    html: html
},
(err, info) => {
    if (err) console.log('Failed to send mail.\nError: ', err.message)
    else console.log(info.response)
}
)
