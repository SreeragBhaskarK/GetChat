import adminModel from "../../frameworks/mongoose/models/adminModel"
import userModel from "../../frameworks/mongoose/models/userModel"

class AdminRepository {

    async getAdmin(email: string) {
        try {
            return await adminModel.findOne({ email })
        } catch (err) {
            throw err
        }
    }

    async getUsers() {
        try {
            return await userModel.find()
        } catch (err) {
            throw err
        }
    }
}


export default AdminRepository