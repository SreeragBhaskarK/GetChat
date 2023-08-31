import { DataTypes, Model, Sequelize } from "sequelize";
import { Post } from "../../../entities/postEntity";
interface PostModel extends Model<Post>,Post{}
const postModel =(sequelize:Sequelize)=>{
    const Post = sequelize.define<PostModel>('Posts',{
        
        post:{
            type:DataTypes.JSON,
            defaultValue:[],
            allowNull:false
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    sequelize.sync()
    return Post
}

export default postModel