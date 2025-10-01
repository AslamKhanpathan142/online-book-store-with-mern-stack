const express = require('express');
const {addBook, showAllBooks, deleteBook} = require('../controllers/bookController')
const multer = require('multer')

const router = express.Router();

const storage = multer.diskStorage({
    // use the destination where upload your files
    destination: function (req, file, cb) {
        return cb(null, "uploads/")
    },
    // name of file
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})


router.post('/addBook', upload.single('image'), addBook);
router.get('/showAllBook', showAllBooks);
router.delete('/deleteBook/:id', deleteBook);

module.exports = router