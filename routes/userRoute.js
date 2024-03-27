import express from "express";
import { deleteUser, getSingleUser, getUsers, login, register, registrationDate, updateUser } from "../controller/userController.js";
import { checkAdmin, checkUser } from "../middleware/auth.js";

const router = express.Router()

// GET
router.get("/getUsers" , checkAdmin , getUsers)
// GET SINGLE
router.get("/getUser/:id" , checkUser ,  getSingleUser)
// REGISTER
router.get("/register" , register)
// LOGIN
router.post("/login" , login)
// UPDATE
router.put("/updateUser/:id" , checkUser , updateUser)
// DELETE
router.delete("/deleteUser/:id" , checkUser , deleteUser)
// STATS
router.get("/registrationDate", checkAdmin , registrationDate)

export default router