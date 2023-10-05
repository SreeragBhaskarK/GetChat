import CheckUserUseCase from "../../useCases/userUseCase/checkUser"
import { Response, Request } from "express";
import UserAuthRepository from "../repositories/userAuthRepository";
import CreateUser from "../../useCases/userUseCase/createUser";
import mongoose from "mongoose";
import { tokenGenerate } from "../../utils/tokenGenerate";
import { bcryptCheck } from "../../utils/bcryptCheck";
import { forgotPasswordMail, forgotPasswordOtp, sendMail, sendOtp } from "../../utils/send";

import { User } from "../../entities/userEntity";
import { otpCheck } from "../../utils/check";
import VerificationEmail from "../../useCases/userUseCase/verifyEmail";
import StatusChange from "../../useCases/userUseCase/statusChange";
import passport from "passport";
import sanitize from "mongo-sanitize";
import GetUser from "../../useCases/userUseCase/getUser";
import UserRepository from "../repositories/userRepository";
import userModel from "../../frameworks/mongoose/models/userModel";
import messageModel from "../../frameworks/mongoose/models/messageModel";
import SetNewPassword from "../../useCases/userUseCase/setNewPassword";
import verifyModel from "../../frameworks/mongoose/models/verifyModel";
const userRepository = new UserRepository(userModel, messageModel)
const userAuthRepository = new UserAuthRepository(userModel,verifyModel);
class UserAuthController {
    static async postLogin(req: Request, res: Response) {
        const { phoneOrusernameOremail, password } = await sanitize(req.body)
        try {
            if (!phoneOrusernameOremail || !password) throw new Error('incomplete details')

            const checkUserUseCase = new CheckUserUseCase(userAuthRepository)
            let userData: User | undefined = await checkUserUseCase.execute(phoneOrusernameOremail)
            let result = await bcryptCheck(userData?.password, password)
            if (userData?.google_auth) throw new Error('already login in google auth')
            if(userData?.status=='block')throw new Error("user account are blocked!")
            if (result && userData) {
                userData.password = undefined

                const userId: mongoose.Types.ObjectId = userData?._id
                let token = await tokenGenerate(userId)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                res.cookie('user', token, {
                    httpOnly: true,
                    secure:true,
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


        const { phoneOrEmail, fullName, username, password } = await sanitize(req.body)

        try {
            if (!phoneOrEmail || !fullName || !username || !password) throw new Error('incomplete details')
            const createUser = new CreateUser(userAuthRepository)
            let userData = await createUser.execute(phoneOrEmail, fullName, username, password)
            console.log(userData);

            if (userData) {
                if (userData.email) {

                    const result = await sendMail(phoneOrEmail, 'signup')
                    if (result) {
                        res.status(200).json({ success: true, message: 'Mail sent successfully.' })
                    } else {
                        res.status(400).json({ success: false, message: 'Mail sent failed.' })
                    }
                } else {
                    const result = await sendOtp(phoneOrEmail)
                    if (result) {
                        res.status(200).json({ success: true, message: 'OTP sent successfully.' })
                    } else {
                        res.status(400).json({ success: false, message: 'OTP sent failed.' })
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
        const { phoneOrusernameOremail } = await sanitize(req.body)

        console.log(phoneOrusernameOremail, '///////');

        try {
            if (!phoneOrusernameOremail) throw new Error('User has no phone or email.')
            const checkUserUseCase = new CheckUserUseCase(userAuthRepository)
            let userData: User | undefined = await checkUserUseCase.execute(phoneOrusernameOremail)
            console.log(userData, 'kdfjkdjfk');

            if (userData?.phone || userData?.email) {
                if (userData.email) {
                    await forgotPasswordMail(userData.email)
                    res.status(200).json({ message: 'Mail sent successfully.', sucess: true, type: 'mail' })
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
            console.log('//////email', req.body);

            const { token, email, type } = await sanitize(req.body)
            if (!token || !email || !type) throw new Error('invalid url')
            const verificationEmail = new VerificationEmail(userAuthRepository)
            let userData = await verificationEmail.execute(email as string, token as string, type as string)
            if (userData) {
                userData.password = undefined
                res.status(200).json({ success: true, message: "Email verification successful.", data: userData })
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
            const { mobileOrEmail, token, otp } = await sanitize(req.body)
            console.log('//////////////', req.body);
            if (!mobileOrEmail) throw new Error('signup error')

            const checkUserUseCase = new CheckUserUseCase(userAuthRepository)
            const userData: User | undefined = await checkUserUseCase.execute(mobileOrEmail)
            if (userData?.verification_status === 'verification processing') {
                if (userData.email) {
                    if (!token) throw new Error('signup error token')
                    const verificationEmail = new VerificationEmail(userAuthRepository)
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
                    }).catch((err) => {
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
        const { phone, otp } = await sanitize(req.body)
        console.log(req.body);

        try {
            if (!phone || !otp) throw new Error('not found phone&otp')
            otpCheck(phone, otp).then(async (result) => {
                console.log(result, 'res');

                if (result) {
                    const statusChange = new StatusChange(userAuthRepository)
                    const userData = await statusChange.execute('active', phone)

                    res.status(200).json({ success: true, message: 'OTP verification successful.', data: userData })
                } else {
                    res.status(400).json({ success: false, message: 'OTP verification failed.' })
                }
            }).catch((err) => {
                res.status(400).json({ success: false, message: err.message })
            })

        }
        catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }

    static async getGoogleCallBack(req: Request, res: Response) {
        try {
            const { FRONTEND_URL } = process.env
            const userData: any = req.user
            if (userData) {
                if(userData?.status=='block')throw new Error("user account are blocked!")
                res.redirect(`${FRONTEND_URL}/login?username=${userData.username}`)

            } else {
                const error = 'failed google authentication'

                res.redirect(`${FRONTEND_URL}/login?error=${error}`)
            }

        } catch (err: any) {
            const { FRONTEND_URL } = process.env
            console.log(err);
            res.redirect(`${FRONTEND_URL}/login?error=${err}`)

        }
    }
    static async getGoogle(req: Request, res: Response) {
        try {
            console.log('///////////////////🥰🥰🥰🥰🥰');

            const { username } = await sanitize(req.query) as { username: string }
            if (!username) throw new Error('missing in Fusername')
            const getUser = new GetUser(userRepository)
            const userData = await getUser.execute(username)
            if (userData) {
                const userId: mongoose.Types.ObjectId = userData?._id
                let token = await tokenGenerate(userId)
                const maxAge = 7 * 24 * 60 * 60 * 1000
                res.cookie('user', token, {
                    httpOnly: true,
                    maxAge: maxAge
                })
                /*   res.redirect('http://localhost:5173/') */
                res.status(200).json({ message: 'success', success: true, data: userData, token: token })
            } else {

                res.status(400).json({ message: 'incorrect auth in google', success: false })

            }
        } catch (err: any) {
            console.log(err);

            res.status(400).json({ success: false, message: err.message })

        }
    }

    static async setNewPassword (req:Request,res:Response){
        try {
            const {email,newPassword,confirmPassword} = await sanitize(req.body)
            if(!email||!newPassword||!confirmPassword)throw new Error('not found data')
            const setNewPassword = new SetNewPassword(userAuthRepository)
            const result = await setNewPassword.execute(email,newPassword,confirmPassword)
            if(result){
                res.status(200).json({success:true,message:'successfully'})
            }else{
                res.status(400).json({success:false,message:'failed'})
            }
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
           
            
        }
    }
}

export default UserAuthController