import DashboardRepository from "../../interfaces/repositories/dashboardRepository"

class GetPopularUsers{
    constructor(private dashboardRepository:DashboardRepository){
        this.dashboardRepository = dashboardRepository
    }

    async execute(){
        try {
            return await this.dashboardRepository.getPopularUsers()
            
        } catch (err) {
            throw err
            
        }
    }

}
export default GetPopularUsers