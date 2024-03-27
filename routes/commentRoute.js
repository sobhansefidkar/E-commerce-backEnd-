import express from "express"
import { checkAdmin, checkLogin } from "../middleware/auth.js"
import { addComment, getComments , deleteComment} from "../controller/commentController.js"
const router = express.Router()

// GET ALL PRODUCTS
router.get("/getComments" , getComments)
// ADD PRODUCT
router.post("/addComment" , checkLogin , addComment)
// DELETE PRODUCT
router.delete("/deleteComment/:id" ,checkAdmin ,  deleteComment)

export default router