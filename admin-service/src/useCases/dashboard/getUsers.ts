import DashboardRepository from "../../interfaces/repositories/dashboardRepository"

class GetUser {
    constructor(private dashboardRepository:DashboardRepository){
        this.dashboardRepository = dashboardRepository
    }

    async execute(type:string,targe:string){
        try {
            return await this.dashboardRepository.getUsers(type,targe)
            
        } catch (err) {
            throw err
            
        }
    }
}

export default GetUser