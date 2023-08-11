import AudienceRepository from "../../interfaces/repositories/audienceRepository";

class BlockAudience{
    constructor(private audienceRepository:AudienceRepository){
        this.audienceRepository = audienceRepository
    }

   async execute(userId:string,status:string){
        try {
            return await this.audienceRepository.blockAudience(userId,status)
            
        } catch (err:any) {
            throw err
        }
    }
}

export default BlockAudience