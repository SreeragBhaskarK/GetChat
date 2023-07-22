import UserRepository from "../../interfaces/repositories/userRepository"

class CheckUserUseCase {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }
    execute(phoneOrusernameOremail: string) {
        try {
            return this.userRepository.findUser(phoneOrusernameOremail)
        } catch (err) {
            throw err
        }
    }
}

export default CheckUserUseCase