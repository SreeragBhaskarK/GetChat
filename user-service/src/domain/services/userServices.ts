import { getLoginRep } from "../repositories/userRepository"

export const getLoginService = () => {
    return getLoginRep()
}