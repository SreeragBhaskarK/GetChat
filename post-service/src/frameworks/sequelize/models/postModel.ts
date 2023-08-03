import {DataTypes, Model, Sequelize} from 'sequelize'
import { Post } from '../../../entities/postEntity'
interface PostModel extends Model<Post> ,Post{}
const postModel= (sequelize:Sequelize)=>{
    const Post = sequelize.define<PostModel>('Posts',{
        user_id:{
            type:DataTypes.STRING
        },
        posts:{
            type:DataTypes.ARRAY(DataTypes.JSON)
        }
    })
    sequelize.sync()
    return Post

}

export default postModel