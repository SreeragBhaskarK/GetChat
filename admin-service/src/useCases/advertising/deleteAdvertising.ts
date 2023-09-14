import AdvertisingRepository from "../../interfaces/repositories/advertisingRepository";

class DeleteAdvertising {
    constructor(private advertisingRepository: AdvertisingRepository) {
        this.advertisingRepository = advertisingRepository
    }

    async execute (id:string){
        try {
            return await this.advertisingRepository.deletingAdvertising(id)
        } catch (err) {
            throw err
            
        }
    }
}
export default DeleteAdvertising