import { Response,Request } from "express"
import PostRepository from "../repositories/postRepository"
import GetPosts from "../../usecases/getPosts"
import { sequelize } from "../../config/connection"
/* import setImage from '../../utils/setImage' */
const postRepository = new PostRepository(sequelize)
class PostController{
    static getPosts=async (req:Request,res:Response)=>{
        try{
            const getPosts = new GetPosts(postRepository)
            const result = await getPosts.execute()
            if(result){
                res.status(200).json({success:true,message:"successfully fetching posts",data:result})
            }else{
                res.status(400).json({success:false,message:"failed fetching posts"})
            }

        }catch(err:any){
            res.status(400).json({success:false,message:err.message})
        }
    }

    static postPosts = async (req:Request,res:Response)=>{
       /*  const {userId}=req.body */
        console.log(req.file,'////////');
      /*   const image = await setImage(req.file) */
        /* console.log(image,req.body); */
        
        
        try {
            
        } catch (err:any) {
            res.status(400).json({success:false,message:err.message})
            
        }
    }

}

export default PostController