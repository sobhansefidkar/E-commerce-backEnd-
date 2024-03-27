import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: Array,
        required: true,
    },
    features : {
        type : Array,
    },
    specification : [
        {
            key : {
                type : String
            },
            value : {
                type : String
            }
        }
    ],
    instruction : {
        type : String,
        required : true
    },
    combination : {
        type : Array
    },
    cat: {
        type: String,
        required : true
    },
    color: {
        type: Array,
    },
    discount : {
        type : Boolean,
        default : false
    },
    discountPercent : {
        type : Number,
        default : 0
    },
    price :{
        type : Number,
        required : true
    },
    instock : {
        type : Boolean , default : true
    }
})

export default mongoose.model("Product" , productSchema)