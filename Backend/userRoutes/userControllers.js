import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export const registerUser = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName) {
            return res.status({ success: false, message: "First Name is required" })
        }
        else if (!lastName) {
            return res.send({ success: false, message: "Last Name is required" })
        }
        else if (!email) {
            return res.send({ success: false, message: "Email is required" })
        }
        else if (!password) {
            return res.send({ success: false, message: "Password is required" })
        }

        // Check for existing user

        const existingUser = await User.findOne({ email: email });


        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User is already registerd. Please Login!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const createUser = await new User({ firstName, lastName, email, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "User registration successfull",
            user: {
                _id: createUser._id,
                firstName: createUser.firstName,
                lastName: createUser.lastName,
                email: createUser.email,
                role: createUser.role
            }
        });





    } catch (error) {
        console.log("Error in register Controller", error);
        res.status(500).send({
            success: false,
            message: "Error in registerController",
            error
        })
    }

}


export const loginUser = async (req, res) => {


    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).send({ success: false, message: "Invalid Email or Password" });
        }

        // Check user exists in DB

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).send({ success: false, message: "User does not exist. Please register!" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid login credentials"
            })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).send({
            success: true,
            message: "User successfully logged in",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                cart: user.cart
            },
            token
        })

    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).send({
            success: false,
            message: "Error in Login Controller",
            error
        })
    }

}


export const userDetails = async (req, res) => {

    try {
        const data = await User.find();

        res.status(200).send({
            success: true,
            message: "Users data has been received",
            usersData: data
        });
    } catch (error) {
        console.log("Error in userDetails", error);
        res.status(500).send({
            success: false,
            message: "Users data could not be found",
            error
        })
    }

}

export const updateDetails = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newPassword = await bcrypt.hash(password, 8);


        const update = await User.findOneAndUpdate({ email }, { password: newPassword });


        res.status(200).send({
            success: true,
            message: "Details updated successfully"
        })

    } catch (error) {
        console.log("Error while updating details", error);
        res.status(500).send({
            success: false,
            message: "There was an error updating the details",
            error: error
        })
    }




}
