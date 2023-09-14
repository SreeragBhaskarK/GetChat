class AdvertisingRepository {
  
    constructor(private advertisingModel:any) {
        this.advertisingModel = advertisingModel
    }


    async getAdvertising(){
        try {
            return await this.advertisingModel.findAll()
            
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