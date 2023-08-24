import UserAuthRepository from "../../interfaces/repositories/userAuthRepository"

class VerificationEmail {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }

    async execute(email: string, token: string, type: string) {
        try {

            return await this.userAuthRepository.verifyToken(email, token, type)
        } catch (error) {
            throw error
        }
    }
}

export default VerificationEmail