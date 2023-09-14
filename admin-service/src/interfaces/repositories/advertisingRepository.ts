import { Sequelize } from "sequelize"
import advertisingModel from "../../frameworks/sequelize/models/advertisingModel"
import { adminProducer } from "../messageBrokers/kafka/postProducer"
class AdvertisingRepository {
    private advertisingModel
    constructor(sequelize: Sequelize) {
        this.advertisingModel = advertisingModel(sequelize)
    }

    async addAdvertising(adName: string, publishedDate: string, placedArea: string, adUrl: string) {
        try {
            const adData = await this.advertisingModel.create({
                ad_name: adName,
                published_date: publishedDate,
                placed_area: placedArea,
                ad_url: adUrl
            })
            await adminProducer(adData.dataValues, 'addPostInUser', 'addAdvertising').catch(async (err) => {
                await this.advertisingModel.destroy({ where: { id: adData.dataValues.id } })
                throw err
            })
            return adData.dataValues

        } catch (err) {
            throw err

        }
    }

    async getAdvertising() {
        try {
            return await this.advertisingModel.findAll({ order: [["published_date", "DESC"]] })

        } catch (err) {
            throw err

        }
    }

    async updateAdvertising(id: string, adName: string, publishedDate: string, placedArea: string, adUrl: string) {
        try {
            const adData = await this.advertisingModel.update({
                ad_name: adName, published_date: publishedDate, placed_area: placedArea, ad_url: adUrl
            }, { where: { id }, returning: true })
            return adData[1]
        } catch (err) {
            throw err

        }
    }

    async deletingAdvertising(id:string){
        try {
            const idAd = String(id)
           const result = await this.advertisingModel.destroy({where:{id:idAd}})
           console.log(result,'deleting',id);
           
            return true
        } catch (err) {
            throw err
            
        }
    }

}

export default AdvertisingRepository