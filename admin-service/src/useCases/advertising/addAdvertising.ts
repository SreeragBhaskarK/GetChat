import AdvertisingRepository from "../../interfaces/repositories/advertisingRepository";

class AddAdvertising {
    constructor(private advertisingRepository: AdvertisingRepository) {
        this.advertisingRepository = advertisingRepository
    }

    async execute(adName: string, publishedDate: string, placedArea: string, adUrl: string) {
        try {

            return await this.advertisingRepository.addAdvertising(adName, publishedDate, placedArea, adUrl)
        } catch (err) {
            throw err
        }
    }
}
export default AddAdvertising