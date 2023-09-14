import mongoose from "mongoose";
import { Notification } from "../../../entities/notificationEntity";

const NotificationSchema = new mongoose.Schema<Notification>({
    notification_id: {
        type: String
    }
    , message: {
        type: String
    },
    duration: {
        type: String,
    }, user_type: {
        type: String
    },
    sender_username: {
        type: String
    },
    recipient_username: {
        type: String
    }, type: {
        default: 'follow',
        type: String
    },
    seen_username: {
        default: [],
        type: []
    }, updatedAt: {
        type: String
    },
    createdAt: {
        type: String
    }

})
export default mongoose.model('Notifications', NotificationSchema)