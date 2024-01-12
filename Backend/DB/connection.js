import mongoose from "mongoose";

const connectDB = () => {


    mongoose.connect(process.env.DB_CONN)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error in mongoDB", err);
        })

}

export default connectDB;