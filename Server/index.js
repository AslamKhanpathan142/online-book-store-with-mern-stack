const express = require('express')
const connectDB = require('./config/db.js')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./routes/authRoutes.js');
const bookRoute = require('./routes/bookRoutes.js');
const cartRoute = require('./routes/addToCartRoute.js');
const userRoute = require('./routes/userRoutes.js');
const orderRoute = require('./routes/orderRoutes.js'); 
const feedbackRoute = require('./routes/feedbackRoutes.js')


const app = express()

// database Connection
dotenv.config()
connectDB()

// Middleware
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/uploads", express.static("uploads"))  // serve uploads


//Routes
app.use('/user', authRoute);
app.use('/book', bookRoute);
app.use('/cart', cartRoute);
app.use('/profile', userRoute);
app.use('/order', orderRoute);
app.use('/feedback', feedbackRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})