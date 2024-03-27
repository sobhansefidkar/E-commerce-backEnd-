import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import commentRoute from "./routes/commentRoute.js"
import orderRoute from "./routes/orderRoute.js"

// CONFIGURATION
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json({limit : "25mb"}))
app.use(express.urlencoded({limit : "25mb" , extended : true}))

// CONNECTIONS
mongoose.connect("connection_route")
.then(res => {
    console.log("database connected")
}).catch(err => {
    console.log("database disconnected")
})
app.listen(3000 , ()=>{
    console.log("server is running")
})

// ROUTES
app.use("/api" , userRoute)
app.use("/api" , productRoute)
app.use("/api" , commentRoute)
app.use("/api" , orderRoute)

// 404 ERROR
app.use((req , res) => {
    res.send("<h1 style=color : 'red';>404 Error</h1>")
})