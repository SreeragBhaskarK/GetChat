import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class GetAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(){
        try{
            return await this.audienceRepository.getAudience()
        }
        catch(err){
            throw err
        }
    }
}

export default GetAudience