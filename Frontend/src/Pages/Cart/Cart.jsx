import React, { useEffect } from 'react'
import Container from '../../Components/Container/Container'
import './Style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import emptyCart from '/images/empty-cart.jpg';
import { addToCart, reduceFromCart, removeFromCart, setCart } from '../../Store/ProductsSlice';
import { FaTrashAlt } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';



const Cart = () => {

    const { cart } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotalCart = () => {
        let total = 0;
        if (cart?.length > 0) {

            for (const product of cart) {
                total += (product.quantity * product.price.orgPrice);
            }
        }


        return Number(total.toFixed(2));
    }



    const handleAdd = (product) => {
        dispatch(addToCart(product));
    }

    const handleReduce = (id) => {
        dispatch(reduceFromCart(id));
    }

    const makePayment = async () => {

        if (user?.user) {
            const stripe = await loadStripe(import.meta.env.VITE_PAYMENT);

            const body = {
                products: cart
            }

            const res = await axios.post(`${import.meta.env.VITE_API}/payment/create-checkout-session`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            console.log("RES", res);
            const session = res?.data?.id;

            const result = stripe.redirectToCheckout({
                sessionId: session
            })

            if (result.error) {
                console.log("Error in react stripe", result.error);
            }
        }
        else {
            alert("Please login in order to complete checkout");
            navigate('/login');
        }

    }


    useEffect(() => {
        getTotalCart();
    }, [cart])

    return (
        <div className={`flex-1 flex py-3 ${cart.length > 0 ? "bg-gray-200" : "bg-white"}`}>
            {cart?.length > 0 ? (
                <Container className={`flex-1 flex`}>
                    <div className="shoppingCart flex-1 flex flex-col lg:flex-row gap-10 bg-white shadow-2xl  rounded p-4">
                        <div className="left  min-w-[70%]">
                            <div className='flex justify-between border-b-2 pb-2 items-center'>
                                <h2 className='text-[25px]'>Shopping Cart</h2>
                                <h2>{cart.length} Item(s)</h2>
                            </div>

                            <div className="productsList2 py-2 flex flex-col gap-3 md:gap-10 mt-5">
                                {cart?.map((product) => {
                                    return (

                                        <div key={product.id} className="cartProduct relative bg-gray-100    flex md:justify-between items-center flex-col md:flex-row gap-6 border-2 rounded-2xl p-[5px]">

                                            <div onClick={() => dispatch(removeFromCart(product.id))} className="removeIcon absolute right-[10px] top-[5px] text-gray-600 cursor-pointer">
                                                <FaTrashAlt />
                                            </div>
                                            <Link to={`/display/${product.id}`} className="left flex justify-start w-full gap-2 md:gap-6  ">
                                                <div className="image max-w-[100px]">
                                                    <img className='min-w-[100px] rounded' src={`/products/${product.image}`} alt="" />
                                                </div>
                                                <div className="me-2 md:max-w-[300px] flex flex-col gap-[5px]">
                                                    <h2 className=' md:min-w-[300px] prodName capitalize'>{product.name}</h2>
                                                    <h2 className='text-[color:var(--ecom-text-bg)] text-[16px]'>${product.price.orgPrice}</h2>
                                                    <div className="categories flex gap-2 capitalize text-[13px] text-gray-400">
                                                        <h2>{product.subCategory}, </h2>
                                                        <h2>{product.category}</h2>
                                                    </div>
                                                    <div className="flex gap-6 ms-4 md:hidden">
                                                        <button onClick={() => handleReduce(product.id)}>-</button>
                                                        <p className='bg-gray-400 p-2'>{product.quantity}</p>
                                                        <button onClick={() => handleAdd(product)}>+</button>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="qty hidden md:flex justify-between gap-4">
                                                <button onClick={() => handleReduce(product.id)}>-</button>
                                                <p className='bg-gray-300 py-[2px] px-[12px] rounded w-full max-w-[40px] mx-2 text-center'>{product.quantity}</p>
                                                <button onClick={() => handleAdd(product)}>+</button>
                                            </div>
                                            <div className="total flex flex-col me-6 hidden md:flex">

                                                <h2 className='max-w-[100px]'>${(product.quantity * product.price.orgPrice).toFixed(2)}</h2>
                                            </div>
                                        </div >
                                    )
                                })}
                            </div >

                        </div >
                        {/* If we set left's min-w-70% and then give the other element width 100% which is right div it will take only the remaining space of parent */}
                        <div className="right w-full">
                            <h2 className='text-[25px] border-b-2 pb-2 lg:text-center'>Order Summary</h2>
                            <div className='w-full flex flex-col gap-4 mt-4 px-4'>
                                <div className="subtotal w-full flex justify-between py-2">
                                    <p>Subtotal</p>
                                    <p>${getTotalCart()}</p>
                                </div>
                                <div className="shipping w-full justify-between border-b-2 pb-4">
                                    <p>Shipping</p>
                                    <p className="text-gray-400 text-[12px] py-2 px-4">Standard Shipping - $10</p>
                                </div>
                                <div className="total flex justify-between text-[18px] font-semibold">
                                    <p className='uppercase'>total cost</p>
                                    <p>${getTotalCart() > 0 ? (getTotalCart() + 10).toFixed(2) : getTotalCart()}</p>
                                </div>
                                <button onClick={makePayment} className='capitalize mt-10 bg-[color:var(--ecom-text-bg)] p-4 rounded text-white text-[16px] max-w-[400px]'>Proceed to checkout</button>
                            </div>
                        </div>
                    </div >

                </Container >
            ) : (<div className='emptyCart h-[500px] flex justify-center w-full'>
                <img className='max-w-[1000px]' src={emptyCart} alt="" />
            </div>)}
        </div >
    )
}

export default Cart
