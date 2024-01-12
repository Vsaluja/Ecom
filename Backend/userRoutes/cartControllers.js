import User from "../models/userModel.js";


export const getCart = async (req, res) => {



    try {
        const { id } = req.body;
        const getUserCart = await User.findOne({ _id: id });


        res.status(200).send({
            success: true,
            message: "Cart data sent successfully",
            cart: getUserCart.cart
        })

    } catch (error) {
        console.log("Error in getCart", error);
        res.status(500).send({
            success: false,
            message: "Cart data could not be sent",
            error
        })
    }

}

export const setCart = async (req, res) => {

    // console.log(req.body);

    try {
        const { id, cart } = req.body;
        const findUser = await User.findOne({ _id: id });


        const update = await User.findByIdAndUpdate(id, { cart: cart });

        res.status(201).send({
            success: true,
            message: "Cart updated successfully"
        })
    }



    catch (error) {
        console.log("Error while updating cart", error);
        res.status(500).send({
            success: false,
            message: "Error in updating cart",
            error
        })
    }




}