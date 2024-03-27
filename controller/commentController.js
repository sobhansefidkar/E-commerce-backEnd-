import Comment from "../model/commentModel.js"

// GET COMMENTS
export const getComments = async (req , res) => {
    try{
        const getComments = await Comment.find()
        res.json(getComments)
    }catch(err){
        res.json(err)
    }
}
// ADD COMMENT
export const addComment = async (req , res) => {
    const comment = req.body

    try{
        const newComment = new Comment(comment)
        const saveComment = await newComment.save()

        res.json(saveComment)
    }catch(err){
        res.json(err)
    }
}
// DELETE COMMENT
export const deleteComment = async (req , res) => {
    try{
        await Comment.findByIdAndDelete(req.params.id)

        res.json("comment deleted successfully")
    }catch(err){
        res.json(err)
    }
}