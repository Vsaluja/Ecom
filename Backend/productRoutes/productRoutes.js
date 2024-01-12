import express from "express";
const router = express.Router();
import multer from "multer";
import { addProduct, allProducts } from "./productControllers.js";
import path from 'path';


router.get('/allProducts', allProducts)



const storage = multer.diskStorage({
    // It is taking path from root which is backend
    destination: './public/products',
    filename: function (req, file, callback) {
        // console.log("storage", file);
        callback(null, file.originalname);
    }
})
const image = multer({ storage: storage });


router.post('/add', image.single("file"), addProduct)







export default router;