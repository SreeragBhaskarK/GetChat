import UserAuthRepository from "../../interfaces/repositories/userAuthRepository"

class CheckUserUseCase {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }
    execute(phoneOrusernameOremail: string) {
        try {
            return this.userAuthRepository.findUser(phoneOrusernameOremail)
        } catch (err) {
            throw err
        }
    }
}

export default CheckUserUseCase