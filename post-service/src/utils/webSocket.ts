import { sequelize } from "../config/connection"
import postModel from "../frameworks/sequelize/models/postModel"
import PostRepository from "../interfaces/repositories/postRepository"
const postRepository = new PostRepository(sequelize)
export const getPostDashboard = async (type: string) => {
    try {
        let target = ''
        if (type == 'month') {
            target = '2023'
        } else if (type == 'day') {
            target = 'day'
        } else if (type == 'week') {
            target = 'week'
        } else if (type == 'year') {
            target = '6'
        }
        return await postRepository.getPostDashboard(type, target)

    } catch (err) {
        throw err

    }

}