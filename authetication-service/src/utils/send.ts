import nodemailer from 'nodemailer'
import verifyModel from '../frameworks/mongoose/models/verifyModel'


const generateVerificationToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
};


export const forgotPasswordMail = async (email: string) => {
    const verificationToken = generateVerificationToken();
    const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}&&email=${email}`
    try {
        const result = await sendMail(email, verificationLink)
        
        if (result) {
          
            const verifyData = await verifyModel.findOne({ email })
         
            
            if (verifyData) {
                await verifyModel.updateOne({ email }, {
                    $set: {
                        token: verificationToken
                    }
                })
                return true
            } else {
                let verify = new verifyModel({
                    email: email,
                    token: verificationToken
                })
                await verify.save()
                return true
            }

        }else{
            return false
        }

    } catch (err) {
        throw err
    }
}

export const forgotPasswordOtp = (phone: string) => {

}


const sendMail = async (email: string, verificationLink: string) => {
    const { SEND_MAIL, SEND_MAIL_PASSWORD } = process.env


    try {
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

        return true
    } catch (err) {
        throw err
    }

}

const sendOtp = () => {

}

