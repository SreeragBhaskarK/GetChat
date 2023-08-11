import UserRepository from "../../interfaces/repositories/userRepository";

class VerificationEmail {
    private userRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string, token: string, type: string) {
        try {

            return await this.userRepository.verifyToken(email, token, type)
        } catch (error) {
            throw error
        }
    }
}

export default VerificationEmail