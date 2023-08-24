import UserRepository from "../../interfaces/repositories/userRepository";

class GetUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(username:string){
        try {
            
          return await this.userRepository.getUser(username)
        } catch (error) {
            throw error
        }
    }
}

export default GetUser