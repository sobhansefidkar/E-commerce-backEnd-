import jwt from "jsonwebtoken"

export const checkLogin = (req , res , next) => {
    const token = req.header("x-auth-token")
    if(!token) return res.json("you need to login")

    try{
        const user = jwt.verify(token , process.env.JWTTOKEN)
        req.user = user
        next()
    }catch(err){
        res.json("token is not valid")
    }
}

export const checkAdmin = (req , res , next) => {
    checkLogin(req , res , ()=> {
        if(req.user.isAdmin){
            next()
        }else{
            res.json("you are not allowed to do that")
        }
    })
}

export const checkUser = (req , res , next) => {
    checkLogin(req , res , () => {
        if(req.user.isAdmin || req.user._id == req.params.id){
            next()
        }else{
            res.json("you are not allowed to do that")
        }
    })
}