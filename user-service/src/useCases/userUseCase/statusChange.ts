import UserAuthRepository from "../../interfaces/repositories/userAuthRepository"

class StatusChange{
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }

    async execute(status:string,phone:string){
        try{
            return this.userAuthRepository.statusChange(status,phone)
        }catch(err){
            throw err
        }
    }
}

export default StatusChange