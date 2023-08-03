import UserRepository from "../interfaces/repositories/userRepository";

class GetUsers {
    private userRepository
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute() {
        try {
            return await this.userRepository.getUser()
        } catch (err) {
            throw err
        }
    }
}

export default GetUsers