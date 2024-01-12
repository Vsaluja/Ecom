import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Product from '../Product/Product';
import './Style.scss';

const Carousel = ({ category, onSale, subCategory, relatedProducts }) => {

    // On sale means if we only want to render the products that are on sale if from some other component we want to use carousel we can use by not passing the onsale feature like we will be using carousel for rocmmended products under product display page and not pass onSale
    const { products } = useSelector((state) => state.products);
    const [items, setItems] = useState();


    const filterProducts = () => {

        const filteredProducts = products?.filter((product) => {
            if (onSale) {

                return product?.category === category && product?.price.oldPrice !== 0;
            }
            else if (category && subCategory) {

                return product?.category === category && product?.subCategory === subCategory;
            }
            else if (category) {

                return product?.category === category;
            }
        })
        setItems(filteredProducts);




    }

    useEffect(() => {
        filterProducts()

    }, [products, category, subCategory])

    return (
        <div className='carousel'>
            <div className='text-[30px] md:text-[40px] capitalize'>{relatedProducts || `Latest Deals in ${category}`}</div>
            <div className="carousel-items rounded bg-gray-100 flex overflow-y-hidden gap-4 py-4 px-4 ">
                {items?.map((item) => {
                    return (
                        <div key={item.id} className='carousel-item flex min-w-[150px] md:min-w-[200px]'>
                            <Product product={item} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Carousel
