const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service : 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'studysaylani123@gmail.com',
        pass: 'gepz dnub bdqz hcnt'
    }
})

const sendEmail = async (data) => {
    try {
        const response = await transporter.sendMail({
            from: 'studysaylani123@gmail.com',
            ...data
        })

        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendEmail
}