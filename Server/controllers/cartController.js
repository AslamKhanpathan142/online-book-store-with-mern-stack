const Cart = require('../models/cart');

const addToCart = async(req, res) => {
    const userId = req.user.id;
    const { bookId } = req.body;

    try {
        const findAddToCart = await Cart.find({userId})
        const isExist = findAddToCart.some((cart) => cart.items.toString() === bookId);
        if(isExist) return res.status(400).json({message: "Book are already available in the cart"})

        const addToCart = await Cart.create({
            userId : userId,
            items : bookId,
        });
        res.status(200).json({message: "Add To Cart Successfully", addToCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const showaddToCart = async(req, res) => {
    const userId = req.user.id;
    try {
        const showaddToCart = await Cart.find({userId}).populate('items', '_id title price description category imageURL');
        res.status(200).json(showaddToCart);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const deleteAddToCart = async(req, res) => {
    const { id } = req.params;
    // const userId = req.user.id;
    try {
        const cart = await Cart.findById(id);
        if(!cart) return res.status(404).json({message: "Cart is Not Found"});
        const deleteAddToCart = await Cart.findByIdAndDelete(id)
        res.status(200).json({message: "Addtocart Delete Successfully", deleteAddToCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addToCart,
    showaddToCart,
    deleteAddToCart
}