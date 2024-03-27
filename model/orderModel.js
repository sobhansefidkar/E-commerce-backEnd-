import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String,required: true},
        products : {type : Array , required : true},
        amount : {type : Number , required : true},
        address : {type : String , required : true},
        transfree : {type : String , required : true},
        state : {type : String , required : true},
        city : {type : String , required : true},
        status : {type : String , default : "انتظار"}
    }, { timestamps: true }


)
export default mongoose.model("Order", OrderSchema)