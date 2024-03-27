import { loginValidator, validator } from "../errorHandling/userError.js"
import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import _ from "lodash"
// GET USERS
export const getUsers = async (req , res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.json("not found")
    }
}

// GET SINGLE USER
export const getSingleUser = async (req , res) => {
    const id = req.params.id

    try{
        const user = await User.findById(id)
        res.json(user)
    }catch(err){
        console.log(err)
    }
}

// REGISTER
export const register = async (req , res) => {
    const user = validator(req.body)

    try{
        const newUser = new User(user)

        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(user.password , salt)
        newUser.password = pass

        const save = await newUser.save()
        res.json({username : save.username , phone : save.phone , _id : save._id})
    }catch(err){
        res.json(err)
    }
}
// LOGIN
export const login = async (req , res) => {
    const {error} = loginValidator(req.body)
    if(error) return res.json(error.message)

    const user = await User.findOne({phone : req.body.phone})
    if(!user) return res.json("user not found")

    const compare = await bcrypt.compare(req.body.password , user.password)
    if(!compare) return res.json("user not found")

    try{
        const token = jwt.sign({_id : user._id , isAdmin : user.isAdmin} , process.env.JWTTOKEN)
        res.header("x-auth-token" , token).json(_.pick(user , "username" , "phone" , "_id"))
    }catch(err){
        console.log(err.message)
    }
}

// UPDATE
export const updateUser = async (req , res) => {
    const user = validator(req.body)

    try{
        if(user.password){
            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hash(req.body.password , salt)
            user.password = pass
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id , user , {new : true})
        res.json({username : updateUser.username , phone : updateUser.phone , _id : updateUser._id})
    }catch(err){
        res.json(user)
    }
}

// DELETE
export const deleteUser = async (req , res) => {
    const id = req.params.id

    try{
        await User.findByIdAndDelete(id)
        res.json("user deleted successfully")
    }catch(err){
        console.log(err)
    }
}

// STATUS
export const registrationDate = async (req , res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1))

    try{
        const data = await User.aggregate([
            {$match : {createdAt : {$gt : lastYear}}},
            {
                $project : {
                    month : {$month : "$createdAt"}
                }
            },
            {
                $group:{
                    _id : "$month",
                    uv : {$sum : 1},
                }
            }
        ]).sort("_id")
        res.json(data)
    }catch(err){
        res.json(err)
    }
}