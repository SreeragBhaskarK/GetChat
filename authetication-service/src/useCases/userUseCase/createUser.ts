import userRepository from "../../interfaces/repositories/userRepository";

class CreateUser{
    private userRepository:userRepository
    constructor(userRepository:userRepository){
        this.userRepository=userRepository

    }
    async execute(mobileOrEmail:string, fullName:string, username:string, password:string){
        return this.userRepository.insertUser(mobileOrEmail,fullName,username,password)
    }
}

export default CreateUser