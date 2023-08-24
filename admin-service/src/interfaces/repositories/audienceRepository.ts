
import userModel from "../../frameworks/sequelize/models/userModel"
import { Op, Sequelize } from 'sequelize';
class AudienceRepository {
    private userModel
    constructor(sequelize: Sequelize) {
        this.userModel = userModel(sequelize)
    }
    async getAudience() {
        try {
            return await this.userModel.findAll()
        } catch (err) {
            throw err
        }
    }

    async addAudience(mobileOrEmail: string, username: string, fullName: string, password: string) {

        try {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobileOrEmail)) {
                const userCheck = await this.userModel.findOne({ where: { [Op.or]: [{ email: mobileOrEmail }, { username }] } })
                console.log('/////', userCheck, "////");

                if (userCheck) throw new Error("already register account")
                await this.userModel.create({
                    email: mobileOrEmail,
                    username,
                    full_name: fullName,
                    password
                })
                return true

            } else if (/^\d{10}$/.test(mobileOrEmail)) {
                const userCheck = await this.userModel.findOne({ where: { [Op.or]: [{ phone: mobileOrEmail }, { username }] } })
                if (userCheck) throw new Error("already register account")
                await this.userModel.create({
                    phone: mobileOrEmail,
                    username,
                    full_name: fullName,
                    password,
                })
                return true
            }

        } catch (err) {

            throw err
        }
    }

    async deleteAudience(userId: string) {
        try {
            const result = await this.userModel.destroy({ where: { user_id: userId } })
            if (result === 0) return false
            return true
        } catch (err) {
            throw err
        }
    }

    async updateAudience(phoneOrEmail: string, username: string, fullName: string) {
        try {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail)) {
                const result = await this.userModel.update({
                    email: phoneOrEmail,
                    username,
                    full_name: fullName
                }, { where: { username: username } })

                if (result[0] === 0) return false
                return true

            } else if (/^\d{10}$/.test(phoneOrEmail)) {
                const result = await this.userModel.update({
                    phone: phoneOrEmail,
                    username,
                    full_name: fullName
                }, { where: { username: username } })

                if (result[0] === 0) return false
                return true
            }
        } catch (err) {
            throw err
        }
    }

    async blockAudience(userId: string, status: string) {
        try {
            const result =  await this.userModel.update({
                status: status
            }, {
                where: { user_id: userId }
            })
            if (result[0] === 0) return false
            return true
        } catch (err) {
            throw err

        }
    }
}

export default AudienceRepository