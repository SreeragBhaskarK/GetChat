import DashboardRepository from "../../interfaces/repositories/dashboardRepository"

class GetNotifications {
    constructor (private dashboardRepository:DashboardRepository){
        this.dashboardRepository =dashboardRepository
    }
    async execute (){
        try {
            return await this.dashboardRepository.getNotifications()
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetNotifications