import AdvertisingRepository from "../../interfaces/repositories/advertisingRepository";

class UpdatingAdvertising{
    constructor (private advertisingRepository:AdvertisingRepository){
        this.advertisingRepository = advertisingRepository
    }

    async execute(id: string, adName: string, publishedDate: string, placedArea: string, adUrl: string){
        try {
            return await this.advertisingRepository.updateAdvertising(id,adName, publishedDate, placedArea, adUrl)
        } catch (err) {
            throw err
            
        }
    }
}

export default UpdatingAdvertising