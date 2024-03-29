import React, { useEffect } from 'react'
import Container from '../../Components/Container/Container'
import success from '/images/success.png'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { setCart } from '../../Store/ProductsSlice'

const Success = () => {
    const { cart } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCart([]))
    }, [cart?.length])

    return (
        <div className='success flex-1 flex'>
            <Container className={`min-h-[90vh] flex items-center justify-center flex-col gap-4`}>
                <img className='w-[100px]' src={success} alt="" />
                <h2 className='font-bold'>Payment Successful</h2>
                <Link to="/" className='bg-red-500 rounded-full p-4 text-white font-bold'>Continue Shopping</Link>
            </Container>
        </div>
    )
}

export default Success
