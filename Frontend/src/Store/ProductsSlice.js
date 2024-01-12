import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    cart: [],
}


export const ProductsSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            // We are receing the entire json product object from ProductDisplay.jsx
            // Adding the product first in state.cart.map we are checking if the product already exists in the cart then increase its quantity by 1
            let found = false;
            state.cart.map((product) => {
                if (product.id === action.payload.id) {
                    found = true;
                    return product.quantity < 10 ? product.quantity += 1 : product.quantity;
                }
            })

            // otherwise
            // Then we move here if the item didn't already existed in the cart so we added the entire product and also added the quantity field to the product so we can keep track of quanitity of that specific product 
            if (!found) {
                state.products.map((product) => {
                    if (product.id === action.payload.id) {
                        return state.cart.push({ ...product, quantity: 1 });
                    }
                })
            }
        },
        // Again receiving only id in the action.payload

        reduceFromCart: (state, action) => {
            state.cart.map((product, i) => {
                if (product.id === action.payload) {
                    if (product.quantity === 1) {
                        state.cart = state.cart.filter((product) => {
                            return product.id !== action.payload;
                        })
                    }
                    return product.quantity > 0 ? product.quantity -= 1 : product.quantity;
                }
            })
        },
        // Completely removes from cart
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => {
                // Here we will only receive id as action.payload not the entire product json object
                return product.id !== action.payload;
            })
        },

    }

})

export const { setProducts, addToCart, reduceFromCart, removeFromCart, setCart } = ProductsSlice.actions

export default ProductsSlice.reducer