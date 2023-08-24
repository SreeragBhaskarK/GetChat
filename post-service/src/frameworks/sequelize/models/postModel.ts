import {DataTypes, Model, Sequelize} from 'sequelize'
import { Post } from '../../../entities/postEntity'
interface PostModel extends Model<Post> ,Post{}
const postModel= (sequelize:Sequelize)=>{
    const Post = sequelize.define<PostModel>('Posts',{
        id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true

        },
        username:{
            type:DataTypes.STRING
        },
        caption:{
            type:DataTypes.STRING
        },
        post_url:{
            type:DataTypes.TEXT
        },
        hashtags:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[]
        },
        likes:{
            type:DataTypes.INTEGER,
            defaultValue:0
        },
        likedBy:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[]
        },
        comments:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[]
        }
    },{timestamps: true})
    sequelize.sync()
    return Post

}

export default postModel