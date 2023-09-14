import { DataTypes, Model, Sequelize } from "sequelize";
import { Advertising } from "../../../entities/advertisingEntity";
interface AdvertisingModel extends Model<Advertising>,Advertising{}
const advertisingModel = (sequelize:Sequelize)=>{
    const Advertising = sequelize.define<AdvertisingModel>('Advertising',{
        id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        ad_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        placed_area:{
            type:DataTypes.STRING,
            allowNull:false
        },
        published_date:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ad_url:{
            type:DataTypes.STRING,
            allowNull:false
        }

    })

    sequelize.sync()
    return Advertising
}

export default advertisingModel