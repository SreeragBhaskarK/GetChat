import UserAuthRepository from "../../interfaces/repositories/userAuthRepository"

class CreateUser {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }
    async execute(mobileOrEmail: string, fullName: string, username: string, password: string) {
        try {
            return await this.userAuthRepository.insertUser(mobileOrEmail, fullName, username, password)
        } catch (err) {
            throw err
        }
    }
}

export default CreateUser