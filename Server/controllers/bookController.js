const Book = require('../models/books')
const Cart = require('../models/cart')

const addBook = async(req, res) => {
    const { title, author, price, description, category} = req.body;
    const imageURL = `/uploads/${req.file.filename}`;
     if (!title || !author || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const isExist = await Book.findOne({title})
    if(isExist) return res.status(400).json({message: "Book is already available"}) 
    try {
        const book = await Book.create({
            title,
            author,
            price, 
            description,
            category,
            imageURL,
        })
        res.status(200).json({message: "Add Book Successfully", book})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const showAllBooks = async(req, res) => {
    try {
        const Allbooks = await Book.find();
        if(!Allbooks) return res.status(400).json({message: "Book is Not Available"})
        res.status(200).json(Allbooks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteBook = async(req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if(!book) return res.status(400).json({message: "Book is Not Find "})
        const deletedCart = await Cart.deleteOne({items: book._id})
        const deleteBook = await Book.findByIdAndDelete(id)
        res.status(200).json({message: "Book are deleted"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addBook,
    showAllBooks,
    deleteBook,
}