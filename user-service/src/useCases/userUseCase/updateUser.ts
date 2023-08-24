import UserRepository from "../../interfaces/repositories/userRepository";

class UpdateUser{
    constructor(private userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async execute(username:string,bio:string,gender:string,profilePic:string){
        try {
            console.log('🚀🚀🚀🚀');
            console.log(username,bio,gender);
            console.log('🚀🚀🚀🚀');
            
          return await this.userRepository.updateUser(username,bio,gender,profilePic)

        } catch (error) {
            throw error
        }
    }
}

export default UpdateUser