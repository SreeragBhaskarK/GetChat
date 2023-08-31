import { adminProducer } from "../../interfaces/messageBrokers/kafka/postProducer"
import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class UpdateAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(phoneOrEmail:string,username:string,fullName:string){
        try{
            return await this.audienceRepository.updateAudience(phoneOrEmail,username,fullName)
            
        }
        catch(err){
            throw err
        }
    }
}

export default UpdateAudience