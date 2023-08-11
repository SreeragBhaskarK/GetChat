import bcrypt from 'bcryptjs'

export const bcryptCheck = (authPassword: string, password: string) => {
    try {
        if (authPassword) {

            return bcrypt.compareSync(password, authPassword)
        }
        else {

            return false
        }
    } catch (error) {
        throw error
    }

}