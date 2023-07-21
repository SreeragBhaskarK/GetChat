import UserRepository from "../../interfaces/repositories/userRepository"

class CheckUserUseCase {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }
    execute(phoneOrusernameOremail: string, password: string) {
        return this.userRepository.findUser(phoneOrusernameOremail)
    }
}

export default CheckUserUseCase