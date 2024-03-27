import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
    },
    pctq : {
        type : Number
    },
    quality : {
        type : Number
    },
    comment : {
        type : String,
        required : true
    }
} , {timestamps : true})

export default mongoose.model("Comment" , commentSchema)