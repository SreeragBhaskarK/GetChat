import { Sequelize } from "sequelize";
import notificationModel from "../../frameworks/sequelize/models/notificationModel";

class NotificationRepository{
    private notificationModel
    constructor(sequelize:Sequelize){
        this.notificationModel=notificationModel(sequelize)
    }
}
export default NotificationRepository