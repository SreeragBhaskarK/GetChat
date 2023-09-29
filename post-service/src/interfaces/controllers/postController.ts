import { Response, Request } from "express"
import PostRepository from "../repositories/postRepository"
import GetPosts from "../../usecases/post/getPosts"
import { sequelize } from "../../config/connection"
import { deleteObject, putObject } from "../../utils/s3"
import AddPosts from "../../usecases/post/addPosts"
import LikePost from "../../usecases/like/likePost"
import UnLikePost from "../../usecases/like/unLikePost"

import ReportPost from "../../usecases/post/reportPost"
import GetPostDetails from "../../usecases/post/getPostDetails"
import AddComment from "../../usecases/comment/addComment"
import EditPost from "../../usecases/post/editPost"
import DeletePost from "../../usecases/post/deletePost"
import DeleteComment from "../../usecases/comment/deleteComment"
import CommentRepository from "../repositories/commentRepository"
import GetComment from "../../usecases/comment/getComment"
import sanitize from "mongo-sanitize"
/* import setImage from '../../utils/setImage' */
const postRepository = new PostRepository(sequelize)
const commentRepository = new CommentRepository(sequelize)
class PostController {
    static getPosts = async (req: Request, res: Response) => {
        try {
            const { page, username, type } = await sanitize(req.body)
            console.log(req.body, '🚀🚀🚀🚀');
            if (!page || !username || !type) throw new Error('missing')
            const getPosts = new GetPosts(postRepository)
            const result = await getPosts.execute(page, username, type)
            if (result) {
                res.status(200).json({ success: true, message: "successfully fetching posts", data: result })
            } else {
                res.status(400).json({ success: false, message: "failed fetching posts" })
            }

        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }

    static postPosts = async (req: Request, res: Response) => {

        /*   const image = await setImage(req.file) */
        console.log(req.body, '🚀🚀🚀🚀');

        const { originalname, mimetype, type } = await sanitize(req.body)
        try {
            if (!originalname || !mimetype) throw new Error('not found data')
            const url = await putObject(originalname, mimetype, type)
            if (url) {
                res.status(200).json({ success: true, message: 'successfully generate signed url', data: url })
            } else {

                res.status(400).json({ success: false, message: 'failed generate signed url' })
            }
        } catch (err: any) {
            res.status(400).json({ success: false, message: err.message })

        }
    }

    static async postUrl(req: Request, res: Response) {
        try {
            console.log('//////', req.body);

            const { url, username, caption } = await sanitize(req.body)
            if (!url || !username || !caption) throw new Error('not found url')
            const addPosts = new AddPosts(postRepository)
            const result = await addPosts.execute(url, username, caption)
            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        }
        catch (err: any) {
            res.status(400).json({ success: false, message: err.message })
        }
    }

    static async postLike(req: Request, res: Response) {
        try {
            const { id, username } = await sanitize(req.body)
            if (!id || !username) throw new Error('not found')
            const likePost = new LikePost(postRepository)

            const result = await likePost.execute(id, username)
            if (result) {
                res.status(200).json({ success: true, message: "successfully", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async postUnLike(req: Request, res: Response) {
        try {
            const { id, username } = await sanitize(req.body)
            if (!id || !username) throw new Error('not found')
            const unLikePost = new UnLikePost(postRepository)

            const result = await unLikePost.execute(id, username)
            if (result) {
                res.status(200).json({ success: true, message: "successfully", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async postReport(req: Request, res: Response) {
        try {
            const { id, type } = await sanitize(req.body)
            if (!id || !type) throw new Error('not found')
            const reportPost = new ReportPost(postRepository)

            const result = await reportPost.execute(id, type)
            if (result) {
                res.status(200).json({ success: true, message: "successfully", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async getProfilePost(req: Request, res: Response) {
        try {
            let { username, page } = await sanitize(req.query) as { username: string, page: string | number }
            page = Number(page)
            if (!username) throw new Error('not found')
            const getPostsDetails = new GetPostDetails(postRepository)

            const result = await getPostsDetails.execute(username, page)
            if (result) {
                res.status(200).json({ success: true, message: "successfully", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async addComment(req: Request, res: Response) {
        try {
            let { id, comment, username } = await sanitize(req.body)
            console.log(req.body);

            if (!id || !comment || !username) throw new Error('not found')
            const addComment = new AddComment(commentRepository)

            const result = await addComment.execute(id, comment, username)
            if (result) {
                res.status(200).json({ success: true, message: "successfully", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async editPost(req: Request, res: Response) {
        try {
            let { id, caption } = await sanitize(req.body)
            console.log(req.body);

            if (!id || !caption) throw new Error('not found')
            const editPost = new EditPost(postRepository)

            const result = await editPost.execute(id, caption)
            if (result) {
                res.status(200).json({ success: true, message: "successfully edited", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async deletePost(req: Request, res: Response) {
        try {
            const { id } = await sanitize(req.query) as { id: string }
            console.log(req.body, '😁😁😁');

            if (!id) throw new Error('not found')
            const deletePost = new DeletePost(postRepository)

            const result = await deletePost.execute(id)
            if (result) {
                res.status(200).json({ success: true, message: "successfully deleted", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }
    static async deleteComment(req: Request, res: Response) {
        try {
            let { commentId } = await sanitize(req.params)
            console.log(req.body);

            if (!commentId) throw new Error('not found')
            const deleteComment = new DeleteComment(postRepository)

            const result = await deleteComment.execute(commentId)
            if (result) {
                res.status(200).json({ success: true, message: "successfully deleted comment", data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {
            res.status(404).json({ success: false, message: err.message })

        }
    }

    static async getComment(req: Request, res: Response) {
        try {
            const { post_id } = await sanitize(req.query) as { post_id: string }
            console.log(post_id, '//////');

            const getComment = new GetComment(commentRepository)
            const result = await getComment.execute(post_id)
            if (result) {
                res.status(200).json({ success: true, message: 'successfully', data: result })
            } else {
                res.status(404).json({ success: false, message: 'failed' })
            }

        } catch (err: any) {

            res.status(404).json({ success: false, message: err.message })

        }

    }

    static async deleteAudio(req: Request, res: Response) {
        try {
            const {url}=req.query as {url:string}

            await deleteObject(url)
            res.status(200).json({ success: true, message: 'successfully' })


        } catch (err: any) {

            res.status(404).json({ success: false, message: err.message })

        }
    }

}

export default PostController