import React from 'react'
import error from '/images/error.png'
import Container from '../../Components/Container/Container'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className='cancel flex-1 flex'>
            <Container className={`min-h-[90vh] flex items-center justify-center flex-col gap-4`}>
                <img className='w-[100px]' src={error} alt="" />
                <h2 className='font-bold'>There was an issue with the payment</h2>
                <Link to="/cart" className='bg-red-500 rounded-full p-4 text-white font-bold'>Back to cart</Link>
            </Container>
        </div>
    )
}

export default Cancel
