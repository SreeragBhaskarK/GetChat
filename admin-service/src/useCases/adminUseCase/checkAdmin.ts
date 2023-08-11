import AdminRepository from "../../interfaces/repositories/adminRepository";

class CheckAdmin {
    private adminRepository
    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository
    }

    execute(email: string) {
        try {
            return this.adminRepository.getAdmin(email)
        } catch (err) {
            throw err
        }
    }
}

export default CheckAdmin