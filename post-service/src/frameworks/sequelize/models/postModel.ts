import {DataTypes, Model, Sequelize} from 'sequelize'
import { Post } from '../../../entities/postEntity'
interface PostModel extends Model<Post> ,Post{}
const postModel= (sequelize:Sequelize)=>{
    const Post = sequelize.define<PostModel>('Posts',{
        id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false


        },
        username:{
            type:DataTypes.STRING,
            allowNull:false

        },
        caption:{
            type:DataTypes.STRING,
            allowNull:false

        },
        post_url:{
            type:DataTypes.TEXT,
            allowNull:false

        },
        hashtags:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[],
            allowNull:false

        },
        likes:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false

        },
        likedBy:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:[],
            allowNull:false

        }
    },{timestamps: true})
    sequelize.sync()
    return Post

}

export default postModel