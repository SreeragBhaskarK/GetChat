import DashboardRepository from "../../interfaces/repositories/dashboardRepository";

class GetPostReports{
    constructor(private dashboardRepository:DashboardRepository){
        this.dashboardRepository=dashboardRepository
    }

    async execute(type:string,targe:string){
        try {
            return await this.dashboardRepository.getPostReports(type,targe)
            
        } catch (err) {
            throw err
            
        }
    }

}

export default GetPostReports