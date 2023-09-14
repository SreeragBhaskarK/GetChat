import mongoose from "mongoose";
import { Advertising } from "../../../entities/advertisingEntity";

const advertisingSchema = new mongoose.Schema<Advertising>({
    ad_name: {
        type: String,
        required: true

    },
    id: {
        type: String,
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    ad_url: {
        type: String,
        required: true
    },
    placed_area: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default  mongoose.model('advertising', advertisingSchema)