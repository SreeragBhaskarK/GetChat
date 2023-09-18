import DashboardRepository from "../../interfaces/repositories/dashboardRepository";

class GetAdvertisingOverview{
    constructor(private dashboardRepository:DashboardRepository){
        this.dashboardRepository=dashboardRepository
    }

    async execute(type:string,targe:string){
        try {
            return await this.dashboardRepository.getAdvertising(type,targe)
            
        } catch (err) {
            throw err
            
        }
    }

}

export default GetAdvertisingOverview