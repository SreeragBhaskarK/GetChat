import { DataTypes, Model, Sequelize } from "sequelize";
import { Comment } from "../../../entities/commentEntity";
interface CommentModel extends Model<Comment>,Comment{}
export const commentModel = (sequelize:Sequelize)=>{
    const Comment = sequelize.define<CommentModel>('Comments',{
        post_id:{
            type:DataTypes.STRING,
            allowNull:false

        },
        username:{
            type:DataTypes.STRING,
            allowNull:false

        },
        text:{
            type:DataTypes.TEXT,
            allowNull:false

        },
        comment_id:{
            type:DataTypes.STRING,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false

        }
    },{timestamps:true})
    sequelize.sync()
    return Comment

}

export default CommentModel