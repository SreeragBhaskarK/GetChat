import { Response,Request } from "express"
import PostRepository from "../repositories/postRepository"
import GetPost from "../../useCases/post/getPost"
import AddPost from "../../useCases/post/addPost"
import UpdatePost from "../../useCases/post/updatePost"
import DeletePost from "../../useCases/post/deletePost"
import { sequelize } from "../../config/connections"
const postRepository = new PostRepository(sequelize)
class postController {
    static getPost = async (req:Request,res:Response) => {
        try{
            const getPost = new GetPost(postRepository)
            const result = await getPost.execute()
            if(result){
                res.status(200).json({success:true,message:'success',data:result})
            }else{
                res.status(400).json({success:false,message:"failed"})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static addPost = async (req:Request,res:Response) => {
        try{
            const addPost = new AddPost(postRepository)
            const result = await addPost.execute()
            if(result){
                res.status(200).json({success:true,message:'success',data:result})
            }else{
                res.status(400).json({success:false,message:"failed"})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static updatePost = async (req:Request,res:Response) => {
        try{
            const updatePost = new UpdatePost(postRepository)
            const result = await updatePost.execute()
            if(result){
                res.status(200).json({success:true,message:'success',data:result})
            }else{
                res.status(400).json({success:false,message:"failed"})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static deletePost = async (req:Request,res:Response) => {
        try{
            const deletePost = new DeletePost(postRepository)
            const result = await deletePost.execute()
            if(result){
                res.status(200).json({success:true,message:'success',data:result})
            }else{
                res.status(400).json({success:false,message:"failed"})
            }
        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }


}

export default postController