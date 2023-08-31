import CommentRepository from "../../interfaces/repositories/commentRepository"



class AddComment {
    constructor(private commentRepository:CommentRepository){
        this.commentRepository = commentRepository
    }

    async execute(id:string,comment:string,username:string){
        try {
            return this.commentRepository.addComments(id,comment,username)
        } catch (err) {
            throw err
        }
    }
}

export default AddComment