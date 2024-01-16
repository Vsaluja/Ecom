import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Carousel from '../../../Components/Carousel/Carousel';

const BestSellers = () => {

    const { products } = useSelector((state) => state.products);

    const [bestSellers, setBestSellers] = useState();

    const filterProducts = () => {
        let result = [];

        if (products?.length > 0) {

            for (let i = 0; i < 7; i++) {
                let random = Math.floor(Math.random() * products?.length);
                result.push(products[random]);
            }

            setBestSellers(result);
        }
    }

    useEffect(() => {
        filterProducts();
    }, [products])

    return (
        <div className='bestSellers'>
            <Carousel productsProvided={bestSellers} title="Best Sellers" />

        </div>
    )
}

export default BestSellers
