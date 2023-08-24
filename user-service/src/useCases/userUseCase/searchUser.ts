import UserRepository from "../../interfaces/repositories/userRepository";

class SearchUser{
    constructor(private userRepository:UserRepository){
        this.userRepository =userRepository
    }

    async execute(key:string){
        try {
            return await this.userRepository.searchUser(key)
            
        } catch (err) {
            throw err
            
        }
    }
}
export default SearchUser