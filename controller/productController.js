import Product from "../model/productModel.js"
import productValidator from "../errorHandling/productError.js"

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
    const qNew = req.query.new
    const qOld = req.query.old
    const qExpensive = req.query.expensive
    const qCheapest = req.query.cheapest
    const qdiscount = req.query.discount
    const qsoldQty = req.query.soldQty
    const qinstock = req.query.instock
    const qoutOfStock = req.query.outOfStock
    const qCat = req.query.cat
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 })
        } else if (qOld) {
            products = await Product.find().sort({ createdAt: 1 })
        } else if (qCat) {
            products = await Product.find({ cat: { $in: [qCat] } })
        } else if (qExpensive) {
            products = await Product.find().sort({ price: -1 })
        } else if (qCheapest) {
            products = await Product.find().sort({ price: 1 })
        } else if (qsoldQty) {
            products = await Product.find().sort({ soldQty: -1 })
        } else if (qdiscount) {
            products = await Product.find({ discount: true })
        } else if (qinstock) {
            products = await Product.find({ instock: true })
        }else if (qoutOfStock) {
            products = await Product.find({ instock: false })
        } else {
            products = await Product.find()
        }

        res.json(products)
    } catch (err) {
        res.json(err)
    }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        // const {password , ...others} = user._doc
        res.json(product)
    } catch (err) {
        res.json(err)
    }
}

// ADD NEW PRODUCT
export const addProduct = async (req, res) => {
    const product = req.body

    try {
        const newProduct = new Product(product)
        await newProduct.save()

        res.json("success")
    } catch (err) {
        res.send(err)
    }
}

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    const {error} = productValidator(req.body)
    if(error){
        return res.json("invalid")
    }
    const product = req.body

    try {
        await Product.findByIdAndUpdate(req.params.id , product , {new : true})
        res.json("successfull")
    } catch (err) {
        console.log("err")
    }
}


// DELETE PRODUCT
export const deleteProduct = async (req , res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json("product deleted")
    } catch (err) {
        res.json(err)
    }
}