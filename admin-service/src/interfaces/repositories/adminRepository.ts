import { Sequelize } from "sequelize"
import { User } from "../../entities/userEntity"
import adminModel from "../../frameworks/sequelize/models/adminModel"

class AdminRepository {
    private AdminModel
    constructor (sequelize:Sequelize){
        this.AdminModel=adminModel(sequelize)
    }

    async getAdmin(email: string) {
        try {
            return await this.AdminModel.findOne({ where:{email} })
        } catch (err) {
            throw err
        }
    }

}


export default AdminRepository