import AdvertisingRepository from "../../interfaces/repositories/advertisingRepository";

class GetAdvertising {
    constructor (private advertisingRepository:AdvertisingRepository){
        this.advertisingRepository =advertisingRepository

    }
    async execute(){
        try {
            return await this.advertisingRepository.getAdvertising()
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetAdvertising