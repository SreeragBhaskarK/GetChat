import { DataTypes, Model, Sequelize } from "sequelize";
import { Post } from "../../../entities/postEntity";
interface PostModel extends Model<Post>,Post{}
const postModel =(sequelize:Sequelize)=>{
    const Post = sequelize.define<PostModel>('Posts',{
        
        post:{
            type:DataTypes.JSON,
            defaultValue:[]
        },
        type:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING
        }
    })

    sequelize.sync()
    return Post
}

export default postModel