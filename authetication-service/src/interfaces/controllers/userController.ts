import CheckUserUseCase from "../../useCases/userUseCase/checkUser"
import { Response, Request } from "express";
import UserRepository from "../repositories/userRepository";
import CreateUser from "../../useCases/userUseCase/createUser";
const userRepository = new UserRepository();
class UserController {
    static async getlogin(req: Request, res: Response) {
        console.log(req.body);
        const { phoneOrusernameOremail, password } = req.body

        const checkUserUseCase = new CheckUserUseCase(userRepository)
        try {
            let resultCheck = await checkUserUseCase.execute(phoneOrusernameOremail, password)
            if (resultCheck) {
                res.status(200).json({ message: 'success', success: true, data: resultCheck })
            } else {
                res.status(400).json({ message: 'failed', success: false })
            }
        }
        catch (err: any) {
            res.status(400).json({ message: err.message, success: false })
        }

    }

    static async getSignup(req: Request, res: Response) {
        console.log(req.body);

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
}

export default UserController