import express from "express";
import dotenv from 'dotenv';
import connectDB from "./DB/connection.js";
import cors from 'cors';
import productRoutes from './productRoutes/productRoutes.js'
import userRoutes from './userRoutes/userRoutes.js';
import paymentRoutes from './paymentRoutes/paymentRoutes.js';


dotenv.config();

const app = express();
// Config env
connectDB();

// https://shoppe-ecom.vercel.app

// https://inspiring-concha-7c4744.netlify.app/

app.use(express.static('public'))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello world")
})

// Stripe payments
app.use('/payment', paymentRoutes);

app.use('/products', productRoutes)
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log("Connedted to port", PORT);
})