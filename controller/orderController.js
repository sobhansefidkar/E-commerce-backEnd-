import Order from "../model/orderModel.js"
// GET ORDERS
export const getOrders = async (req, res) => {
    const lastWeekOrders = req.query.qlastWeek
    const lastDayOrders = req.query.qlastDay
    const lastMonthOrders = req.query.qlastMonth
    const lastYearOrders = req.query.qlastYear
    const date = new Date()
    const lastDay = new Date(date.setHours(date.getHours() - 24))
    const lastWeek = new Date(date.setHours(date.getHours() - 168))
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const lastYear = new Date(date.setMonth(date.getMonth() - 12))
    // const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        let orders;
        if(lastDayOrders){
            orders = await Order.find({
                createdAt : {$gte : lastDay}
            })
        }else if(lastWeekOrders){
            orders = await Order.find({
                createdAt : {$gte : lastWeek}
            })
        }else if(lastMonthOrders){
            orders = await Order.find({
                createdAt : {$gte : lastMonth}
            })
        }else if(lastYearOrders){
            orders = await Order.find({
                createdAt : {$gte : lastYear}
            })
        }else{
            orders = await Order.find()
        }
        res.json(orders)
    } catch (err) {
        res.json(err)
    }
}

// GET SINGLE ORDER
export const getOrder = async (req, res) => {
    try {
        const order = await Order.find({userId : req.params.id})
        res.json(order)
    } catch (err) {
        res.json(err)
    }
}

// ADD ORDER
export const addOrder = async (req, res) => {
    const order = req.body;
    try {
        const newOrder = new Order(order)
        const saveOrder = await newOrder.save()

        res.json(saveOrder)
    } catch (err) {
        res.json(err)
    }
}

// STATUS
export const orderStatus = async (req , res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1))

    try{
        const data = await Order.aggregate([
            {$match : {createdAt : {$gt : lastYear}}},
            {
                $project : {
                    month : {$month : "$createdAt"},
                    amount : 1
                }
            },
            {
                $group:{
                    _id : "$month",
                    total : {$sum : 1},
                    amount : {$sum : "$amount"}
                }
            }
        ]).sort("_id")
        res.json(data)
    }catch(err){
        res.json(err)
    }
}