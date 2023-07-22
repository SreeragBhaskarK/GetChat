import userRepository from "../../interfaces/repositories/userRepository";

class CreateUser {
    private userRepository: userRepository
    constructor(userRepository: userRepository) {
        this.userRepository = userRepository

    }
    async execute(mobileOrEmail: string, fullName: string, username: string, password: string) {
        try {
            return this.userRepository.insertUser(mobileOrEmail, fullName, username, password)
        } catch (err) {
            throw err
        }
    }
}

export default CreateUser