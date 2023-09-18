import AdvertisingRepository from "../../interfaces/repositories/advertisingRepository";

class GetAdvertising {
    constructor (private advertisingRepository:AdvertisingRepository){
        this.advertisingRepository =advertisingRepository

    }
    async execute(type:string,page:string){
        try {
            return await this.advertisingRepository.getAdvertising(type,page)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetAdvertising