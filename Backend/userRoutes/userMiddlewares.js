import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {

    try {

        const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);

        req.user = decode

        next();

    } catch (error) {
        console.log(`Error in require sign in middleware ${error}`);
        res.status(401).send({
            success: false,
            message: "Token Expired. Please login again. Error in require sign in",
            error
        })
    }

}

export const isAdmin = async (req, res, next) => {
    try {
        // we are getting the user._id by the require sign in controller bcx in that we are setting req.user = decode
        const user = await User.findById(req.user._id);

        if (!user.role) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access'
            })
        }

        next();
    } catch (error) {
        console.log(`Error in isAdmin middleware ${error}`);
        res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error
        })
    }
}

// User details

