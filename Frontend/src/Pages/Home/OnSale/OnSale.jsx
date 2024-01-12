import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel from '../../../Components/Carousel/Carousel';


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
                </div>

            })}

        </div>
    )
}

export default OnSale
