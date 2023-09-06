import { sequelize } from "../config/connections";
import {notificationModel} from "../frameworks/sequelize/models/notificationModel";

export const webSocket = async (data: any) => {
    try {
        console.log(data,'//////data/');
        const result = await notificationModel(sequelize).create({
            message:data.message,
            type:data.type,
            duration:data.duration,
            user_type:data.userType
        })
        console.log(result,'kdkf');
        return true

    } catch (err) {
        throw err
    }
}