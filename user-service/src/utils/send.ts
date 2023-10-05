import nodemailer from 'nodemailer'
import verifyModel from '../frameworks/mongoose/models/verifyModel'
import twilio from 'twilio';

const generateVerificationToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
};


export const forgotPasswordMail = async (email: string) => {

    try {
        await sendMail(email,'forgot')
        return true
    } catch (err) {
        throw err
    }
}

export const forgotPasswordOtp = async (phone: string) => {

    try {
        await sendOtp(phone)
        return true
    }
    catch (err) {
        throw err
    }

}


export const sendMail = async (email: string,type:string) => {

    try {
        const { SEND_MAIL, SEND_MAIL_PASSWORD } = process.env
        if (!SEND_MAIL || !SEND_MAIL_PASSWORD) throw new Error("Mail services error")
        const verificationToken = await generateVerificationToken();
        const verificationLink = `http://localhost:5173/verification?token=${verificationToken}&&email=${email}&&type=${type}`
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: SEND_MAIL,
                pass: SEND_MAIL_PASSWORD,
            },
        });
        // Define email options
        const mailOptions = {
            from: process.env.SEND_MAIL,
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);



        const verifyData = await verifyModel.findOne({ email })


        if (verifyData) {
            await verifyModel.updateOne({ email }, {
                $set: {
                    token: verificationToken
                }
            })
           
        } else {
            let verify = new verifyModel({
                email: email,
                token: verificationToken
            })
            await verify.save()
           
        }
        return true

    } catch (err) {
        throw err
    }

}

export const sendOtp = async (phone: string) => {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICES } = process.env
    try {
        if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SERVICES) throw new Error('otp service credentials are missing.')
        const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        const result = await client.verify.v2.services(TWILIO_SERVICES)
            .verifications
            .create({ to: '+91' + phone, channel: 'sms' })
        console.log(result);

        return true
    }
    catch (err) {
        throw err
    }

}

