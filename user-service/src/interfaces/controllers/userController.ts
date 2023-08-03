import { Request, Response } from "express"
import UserRepository from "../repositories/userRepository"
import GetUsers from "../../useCases/getUserUseCase"

const userRepository = new UserRepository()

class UserController {
    static Profile = async (req: Request, res: Response) => {
        try {

            const getUser = new GetUsers(userRepository)
            const result = await getUser.execute()
            if (result) {
                res.status(200).json({ success: true, message: 'success', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }
        } catch (err: any) {
            res.status(400).json({ success: true, message: err.message })
        }

    }
}

export default UserController