class AdvertisingRepository {
  
    constructor(private advertisingModel:any) {
        this.advertisingModel = advertisingModel
    }


    async getAdvertising(type:string,page:string){
        try {
            const pageNum:number = Number(page)
            const skip = (pageNum-1)*1
            return await this.advertisingModel.find({placed_area:type}).skip(skip).limit(1)
            
        } catch (err) {
            throw err
        }
    }

    /* async reportAdvertising(id:string,report:string,userId){
        try {

            
        } catch (err) {
            throw err
            
        }
    } */
}

export default AdvertisingRepository