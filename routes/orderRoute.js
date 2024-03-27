import express from "express"
import { addOrder, getOrder, getOrders, orderStatus } from "../controller/orderController.js"
import { checkAdmin, checkUser } from "../middleware/auth.js"

const router = express.Router()

// GET ORDERS
router.get("/getOrders" , checkAdmin ,  getOrders)
// GET ORDER
router.get("/getOrder/:id" , checkUser , getOrder)
// ADD ORDER
router.post("/addOrder" , checkUser , addOrder)
// ORDER STATUS
router.get("/orderStatus" , checkAdmin ,  orderStatus)

export default router