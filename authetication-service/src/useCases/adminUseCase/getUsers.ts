import AdminRepository from "../../interfaces/repositories/adminRepository"

class GetUsers{
    private adminRepository
    constructor(adminRepository:AdminRepository){
        this.adminRepository = adminRepository
    }

    execute(){
        return this.adminRepository.getUsers()
    }
}

export default GetUsers