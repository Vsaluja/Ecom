import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        lowercase: true
    },
    subCategory: {
        type: String,
        required: true,
        lowercase: true,
        lowercase: true
    },
    image: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    price: {
        oldPrice: {
            type: Number,
            default: 0
        },
        orgPrice: {
            type: Number,
            required: true
        }
    },
    // Tags helps in searching we can provide tags to products such as nike, womens, shoes so it helps in searching
    allTags: {
        type: Object,
        default: [],
        lowercase: true
    }
}, { timestamps: true })

export default mongoose.model("products", productSchema);