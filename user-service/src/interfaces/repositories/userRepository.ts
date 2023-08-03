class UserRepository {
    getUser() {
        try {
            return 'getting'
        } catch (err) {
            throw err
        }
    }
}

export default UserRepository