import AudienceRepository from "../../interfaces/repositories/audienceRepository"

class AddAudience{
    private audienceRepository
    constructor (audienceRepostory:AudienceRepository){
        this.audienceRepository =audienceRepostory
    }

    async execute(mobileOrEmail:string,username:string,fullName:string,password:string){
        try{
            return this.audienceRepository.addAudience(mobileOrEmail,username,fullName,password)
        }
        catch(err){
            throw err
        }
    }
}

export default AddAudience