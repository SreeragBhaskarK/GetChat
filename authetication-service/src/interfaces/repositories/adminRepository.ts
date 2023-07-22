import adminModel from "../../frameworks/mongoose/models/adminModel"

class AdminRepository {

    async getAdmin(email: string) {
        try {
            return await adminModel.findOne({ email })
        } catch (err) {
            throw err
        }
    }
}
export default AdminRepository