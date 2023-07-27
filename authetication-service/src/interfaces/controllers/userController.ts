import CheckUserUseCase from "../../useCases/userUseCase/checkUser"
import { Response, Request } from "express";
import UserRepository from "../repositories/userRepository";
import CreateUser from "../../useCases/userUseCase/createUser";
import mongoose from "mongoose";
import { tokenGenerate } from "../../utils/tokenGenerate";
import { bcryptCheck } from "../../utils/bcryptCheck";
import { forgotPasswordMail, forgotPasswordOtp } from "../../utils/send";
import Verification from "../../useCases/userUseCase/verifyUser";
const userRepository = new UserRepository();
class UserController {
    static async postLogin(req: Request, res: Response) {
        const { phoneOrusernameOremail, password } = req.body

        const checkUserUseCase = new CheckUserUseCase(userRepository)
        try {
            let userData = await checkUserUseCase.execute(phoneOrusernameOremail)
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
                res.status(400).json({ message: 'user not found', success: false })
            }
        }
        catch (err: any) {
            res.status(400).json({ message: err.message, success: false })
        }

    }

    static async postSignup(req: Request, res: Response) {


        const { mobileOrEmail, fullName, username, password } = req.body
        const createUser = new CreateUser(userRepository)
        try {
            let result = await createUser.execute(mobileOrEmail, fullName, username, password)

            if (result) {
                res.status(200).json({ message: "success", success: true })
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


        const checkUserUseCase = new CheckUserUseCase(userRepository)
        try {
            let userData = await checkUserUseCase.execute(phoneOrusernameOremail)
            if (userData?.phone || userData?.email) {
                if (userData.email) {
                    await forgotPasswordMail(userData.email)
                    res.status(400).json({ message: 'sended', sucess: true, type: 'mail' })
                } else if (userData.phone) {
                    await forgotPasswordOtp(userData.phone)
                    res.status(400).json({ message: 'sended', sucess: true, type: 'phone' })
                }


            } else {
                res.status(400).json({ message: 'user not found', sucess: false })
            }

        } catch (err: any) {
            res.status(400).json({ message: err.message, sucess: false })
        }
    }

    static async getVerify(req: Request, res: Response) {
        try {
            const { token, email } = req.query
            const verifications = new Verification(userRepository)
            let userData = await verifications.execute(email as string, token as string)
            if (userData) {
                res.status(200).send('<h1>successful</h1>')
            } else {
                res.status(404).send('<h1>failed</h1>')
            }
        }
        catch (err) {
            res.status(404).send('<h1>failed</h1>')
        }
    }

    static async postOtpSend(req: Request, res: Response) {
        try {
            const { mobileOrEmail } = req.body
            const checkUserUseCase = new CheckUserUseCase(userRepository)
            const userData = await checkUserUseCase.execute(mobileOrEmail)
            if (userData?.status === 'verification processing') {
                
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }


        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }
}

export default UserController