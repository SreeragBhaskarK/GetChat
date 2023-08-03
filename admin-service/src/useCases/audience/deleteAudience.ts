import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class DeleteAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(userId:string){
        try{
            return this.audienceRepository.deleteAudience(userId)
        }
        catch(err){
            throw err
        }
    }
}

export default DeleteAudience