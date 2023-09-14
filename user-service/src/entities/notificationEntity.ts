export interface Notification {
    notification_id?:string
    message:string
    type?:string
    duration?:string
    user_type?:string
    sender_username?:string
    recipient_username?:string
    seen_username?:[]
    updatedAt:string
    createdAt:string
}