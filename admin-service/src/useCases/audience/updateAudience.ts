import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class UpdateAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(mobileOrEmail:string,username:string,fullName:string,password:string,userId:string){
        try{
            return this.audienceRepository.updateAudience(mobileOrEmail,username,fullName,password,userId)
        }
        catch(err){
            throw err
        }
    }
}

export default UpdateAudience