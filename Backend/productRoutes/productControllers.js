
import Product from "../models/productModel.js";



export const allProducts = async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).send({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}


export const addProduct = async (req, res) => {
    try {
        const { id, name, category, subCategory, image, price: orgPrice, oldPrice, description, allTags } = req.body;
        // const image = req.file.originalname;

        console.log(req.body);

        if (oldPrice === "") {
            oldPrice = 0;
        }

        if (!id) {
            return res.status(200).send({
                success: false,
                message: "Id is not provided"
            })
        }
        if (!name) {
            return res.status(200).send({
                success: false,
                message: "Name is not provided"
            })
        }
        if (!category) {
            return res.status(200).send({
                success: false,
                message: "Category is not provided"
            })
        }
        if (!subCategory) {
            return res.status(200).send({
                success: false,
                message: "Sub category is not provided"
            })
        }

        if (!orgPrice) {
            return res.status(200).send({
                success: false,
                message: "Price is not provided"
            })
        }
        if (!description) {
            return res.status(200).send({
                success: false,
                message: "Description is not provided"
            })
        }
        // if (!allTags) {
        //     return res.status(200).send({
        //         success: false,
        //         message: "Tags are not provided"
        //     })
        // }l
        if (!image) {
            return res.status(200).send({
                success: false,
                message: "Image is not provided"
            })
        }

        // // checking existing product with similar id

        const existingProduct = await Product.findOne({ id });

        if (existingProduct) {
            return res.status(400).send({
                success: false,
                message: "Product with this ID already exists"
            })
        }

        const newProduct = await new Product({ id, name, category, subCategory, price: { orgPrice, oldPrice }, image, description, allTags }).save();

        res.status(201).send({
            success: true,
            message: "Product successfully added"
        })


    } catch (error) {
        console.log(error);
    }

}
