import UserRepository from "../../interfaces/repositories/userRepository";

class StatusChange{
    private userRepository
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(status:string,username:string){
        try{
            return this.userRepository.statusChange(status,username)
        }catch(err){
            throw err
        }
    }
}