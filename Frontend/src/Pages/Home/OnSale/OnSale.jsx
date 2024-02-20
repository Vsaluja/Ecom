import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel from '../../../Components/Carousel/Carousel';
import { Link } from 'react-router-dom';


const OnSale = () => {

    const { products } = useSelector((state) => state.products);

    const [categories, setCategories] = useState();

    const uniqueCategories = () => {
        const uniqueList = [...new Set(products?.map((product) => {
            return product.category;
        }))]

        setCategories(uniqueList);

    }

    useEffect(() => {
        uniqueCategories();

    }, [products])


    return (
        <div className='onSale'>
            {categories?.map((category, i) => {
                return <div key={i} className='mt-16'>

                    <Carousel category={category} onSale={true} />
                    <Link to={`/category/${category}`} className='inline-block px-4 py-[5px] m-2 text-[12px] md:text-[16px] bg-black text-white rounded hover:bg-[#00011] duration-300'>View All</Link>
                </div>

            })}

        </div>
    )
}

export default OnSale
