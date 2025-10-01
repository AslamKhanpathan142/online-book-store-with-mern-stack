const Order = require('../models/orders')
const User = require('../models/users')
const OrderAdmin = require('../models/OrderAdmin')

const bookOrder = async(req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id;

    const autoId =`ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    

    try {
        const order = await Order.create({
            orderId : userId,
            items : bookId,
            ordId : autoId,
        })
        const showOrder = await Order.findOne({ordId: autoId}).populate('orderId', 'name email').populate('items', 'title price');
        const showOrderDetail = await OrderAdmin.create({
            orId: showOrder.ordId,
            bookTitle: showOrder.items.title,
            userName: showOrder.orderId.name,
            userEmail: showOrder.orderId.email,
            date: showOrder.createdAt,
            price: showOrder.items.price
        })
        res.status(200).json({message: "Order is Successfully", order});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const showUserOrder = async(req, res) => {
    const orderId = req.user.id;
    try {
        const userOrder = await Order.find({orderId}).populate('items', '_id title author price description category imageURL');
        res.status(200).json(userOrder);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 }

 const showAllOrder = async(req, res) => {
    try {
        // const allOrder = await Order.find().populate('orderId', '_id name email phone').populate('items', '_id title author price description category');
        const allOrder = await OrderAdmin.find();
        res.status(200).json(allOrder)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 }

module.exports = {
    bookOrder,
    showUserOrder,
    showAllOrder
}