import UserRepository from "../../interfaces/repositories/userRepository";

class StatusChange{
    private userRepository
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(status:string,phone:string){
        try{
            return this.userRepository.statusChange(status,phone)
        }catch(err){
            throw err
        }
    }
}

export default StatusChange