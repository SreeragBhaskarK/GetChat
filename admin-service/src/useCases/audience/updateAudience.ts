import { adminProducer } from "../../interfaces/messageBrokers/kafka/postProducer"
import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class UpdateAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(phoneOrEmail:string,username:string,fullName:string){
        try{
            const result = await this.audienceRepository.updateAudience(phoneOrEmail,username,fullName)
            if(result){
               await adminProducer({phoneOrEmail,username,fullName},'addPostInUser','updateUser')
            }
            return true
        }
        catch(err){
            throw err
        }
    }
}

export default UpdateAudience