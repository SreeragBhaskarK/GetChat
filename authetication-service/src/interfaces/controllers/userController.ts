import CheckUserUseCase from "../../useCases/userUseCase/checkUser"
import { Response, Request } from "express";
import UserRepository from "../repositories/userRepository";
import CreateUser from "../../useCases/userUseCase/createUser";
import mongoose from "mongoose";
import { tokenGenerate } from "../../utils/tokenGenerate";
import { bcryptCheck } from "../../utils/bcryptCheck";
import { forgotPasswordMail, forgotPasswordOtp, sendMail, sendOtp } from "../../utils/send";

import { User } from "../../entities/userEntity";
import { otpCheck } from "../../utils/check";
import VerificationEmail from "../../useCases/userUseCase/verifyEmail";
const userRepository = new UserRepository();
class UserController {
    static async postLogin(req: Request, res: Response) {
        const { phoneOrusernameOremail, password } = req.body
        try {
            if (!phoneOrusernameOremail || !password) throw new Error('incomplete details')
            const checkUserUseCase = new CheckUserUseCase(userRepository)
            let userData: User | undefined = await checkUserUseCase.execute(phoneOrusernameOremail)
            let result = await bcryptCheck(userData?.password, password)

            if (result && userData) {
                userData.password = undefined

                const userId: mongoose.Types.ObjectId = userData?._id
                let token = await tokenGenerate(userId)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                res.cookie('user', token, {
                    httpOnly: true,
                    maxAge: maxAge
                })
                res.status(200).json({ message: 'success', success: true, data: userData, token: token })
            } else {
                res.status(400).json({ message: 'incorrect password', success: false })
            }
        }
        catch (err: any) {
            res.status(400).json({ message: err.message, success: false })
        }

    }

    static async postSignup(req: Request, res: Response) {


        const { mobileOrEmail, fullName, username, password } = req.body

        try {
            if (!mobileOrEmail || !fullName || !username || !password) throw new Error('incomplete details')
            const createUser = new CreateUser(userRepository)
            let userData = await createUser.execute(mobileOrEmail, fullName, username, password)
            console.log(userData);

            if (userData) {
                if(userData.email){
                   
                    const result = await sendMail(mobileOrEmail)
                    if(result){
                        res.status(200).json({success:true,message:'Mail sent successfully.'})
                    }else{
                         res.status(400).json({success:false,message:'Mail sent failed.'})
                    }
                }else{
                    const result = await sendOtp(mobileOrEmail)
                    if(result){
                        res.status(200).json({success:true,message:'OTP sent successfully.'})
                    }else{
                         res.status(400).json({success:false,message:'OTP sent failed.'})
                    }
                }
             
            } else {
                res.status(400).json({ message: 'failed', success: false })
            }

        }
        catch (err: any) {
            res.status(400).json({ message: err.message, success: false })
        }
    }

    static async deleteLogout(req: Request, res: Response) {
        try {
            await res.cookie('user', '', {
                maxAge: 1
            })

            res.status(200).json({ message: "success", success: true })
        } catch (err: any) {
            res.status(400).json({ message: err.message, success: false })
        }
    }

    static async postForgotPassword(req: Request, res: Response) {
        const { phoneOrusernameOremail } = req.body


        try {
            if (!phoneOrusernameOremail) throw new Error('User has no phone or email.')
            const checkUserUseCase = new CheckUserUseCase(userRepository)
            let userData: User | undefined = await checkUserUseCase.execute(phoneOrusernameOremail)
            console.log(userData, 'kdfjkdjfk');

            if (userData?.phone || userData?.email) {
                if (userData.email) {
                    await forgotPasswordMail(userData.email)
                    res.status(400).json({ message: 'Mail sent successfully.', sucess: true, type: 'mail' })
                } else if (userData.phone) {
                    await forgotPasswordOtp(userData.phone)
                    res.status(400).json({ message: 'OTP sent successfully.', sucess: true, type: 'phone' })
                }


            } else {
                res.status(400).json({ message: 'user not found', sucess: false })
            }

        } catch (err: any) {
            res.status(400).json({ message: err.message, sucess: false })
        }
    }

    static async postEmailVerification(req: Request, res: Response) {
        try {
            const { token, email, type } = req.body
            if (!token || !email || !type) throw new Error('invalid url')
            const verificationEmail = new VerificationEmail(userRepository)
            let userData = await verificationEmail.execute(email as string, token as string, type as string)
            if (userData) {
                res.status(200).json({ success: true, message: "Email verification successful." })
            } else {
                res.status(404).json({ success: false, message: "Email verification failed." })
            }
        }
        catch (err: any) {
            res.status(404).json({ success: false, message: err.message })
        }
    }

    static async postSignupVerification(req: Request, res: Response) {
        try {
            const { mobileOrEmail, token, otp } = req.body
            console.log('//////////////',req.body);
            if (!mobileOrEmail) throw new Error('signup error')
            
            const checkUserUseCase = new CheckUserUseCase(userRepository)
            const userData: User | undefined = await checkUserUseCase.execute(mobileOrEmail)
            if (userData?.status === 'verification processing') {
                if (userData.email) {
                    if (!token) throw new Error('signup error token')
                    const verificationEmail = new VerificationEmail(userRepository)
                    const result = await verificationEmail.execute(userData.email, token, 'signup')
                    if (result) {
                        res.status(200).json({ success: true, message: 'Email verification successful.' })
                    } else {
                        res.status(400).json({ success: false, message: 'Email verification failed.' })
                    }
                } else if (userData.phone) {
                    if (!otp) throw new Error('signup error otp')
                    otpCheck(userData.phone, otp).then((result) => {
                        if (result) {
                            res.status(200).json({ success: true, message: 'OTP verification successful.' })
                        } else {
                            res.status(400).json({ success: false, message: 'OTP verification failed.' })
                        }
                    }).catch((err)=>{
                        res.status(400).json({ success: false, message: err.message })
                        
                    })
                }
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }

    static async postOtpVerification(req: Request, res: Response) {
        const { phone, otp } = req.body
        try {
            if (!phone || !otp) throw new Error('not found phone&otp')
            otpCheck(phone, otp).then((result) => {
                console.log(result, 'res');

                if (result) {
                    res.status(200).json({ success: true, message: 'OTP verification successful.' })
                } else {
                    res.status(400).json({ success: false, message: 'OTP verification failed.' })
                }
            })

        }
        catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }
}

export default UserController