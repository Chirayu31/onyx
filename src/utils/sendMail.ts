import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PWD,
  },
})

export const sendVerficationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Onyx: Please verify your email',
    html: `
      <p>Please click the following link to verify your email address on Onyx:</p>
      <a href="${process.env.APP_URL}/verify-email">Verify Email</a>
      <p> Your verification token is ${token} </p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Verification email sent to:', email)
  } catch (error) {
    console.error('Error sending verification email:', error)
  }
}
