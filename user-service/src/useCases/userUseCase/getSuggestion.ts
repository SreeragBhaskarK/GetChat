import UserRepository from "../../interfaces/repositories/userRepository"

class GetSuggestion {
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute (username:string){
        try {
            return await this.userRepository.getSuggestion(username)
            
        } catch (err) {
            throw err
            
        }
    }
}
export default GetSuggestion