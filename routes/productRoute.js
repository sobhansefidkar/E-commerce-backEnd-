import express from "express"
import { addProduct, getProducts, getSingleProduct, updateProduct , deleteProduct} from "../controller/productController.js"
import { checkAdmin, checkUser } from "../middleware/auth.js"

const router = express.Router()

// GET ALL PRODUCTS
router.get("/getProducts" , getProducts)
// GET SINGLE PRODUCT
router.get("/getProduct/:id" , getSingleProduct)
// ADD PRODUCT
router.post("/addProduct" , checkAdmin , addProduct)
// UPDATE PRODUCT
router.put("/updateProduct/:id" , checkAdmin , updateProduct)
// DELETE PRODUCT
router.delete("/deleteProduct/:id" , checkAdmin , deleteProduct)

export default router