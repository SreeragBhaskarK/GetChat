import userModel from "../../frameworks/mongoose/models/userModel"

class userRepository {

    async findUser(phoneOrusernameOremail: string) {
        try {
            let userData = await userModel.find()
            return userData
        } catch (err: any) {
            throw err
        }
    }

    async insertUser(mobileOrEmail: string, fullName: string, username: string, password: string) {
        try {
            let userData = new userModel({
                mobile: mobileOrEmail,
                email: mobileOrEmail,
                full_name: fullName,
                username: username,
                password: password
            })
            userData.save()
            return true
        } catch (err) {
            throw err
        }
    }
}

export default userRepository