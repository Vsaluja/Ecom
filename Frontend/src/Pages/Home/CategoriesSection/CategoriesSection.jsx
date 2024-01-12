import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {

    const { products } = useSelector((state) => state.products);

    const [categories, setCategories] = useState();

    // It goes through all the products and gets the list of categories from those products and then filters the unique categories and store them in the array if a category repeats it stores them in the array only once
    const uniqueCategories = () => {
        const uniqueList = ["all", ...new Set(products?.map((product) => {
            return product.category;
        }))]

        setCategories(uniqueList);

    }

    useEffect(() => {

        uniqueCategories();

    }, [products])

    return (
        <div className='categorySection w-full my-10'>
            <h2 className='text-center text-[25px] md:text-[50px]'>Explore Categories</h2>
            <div className=' w-full flex justify-center gap-2 md:gap-10 flex-wrap mt-4'>
                {categories?.map((category, i) => {
                    return (<Link key={i} to={`/category/${category}`} className='capitalize text-[13px] lg:text-[20px] px-4 py-2 bg-[color:var(--ecom-text-bg)] hover:bg-[color:var(--ecom-text-hover-bg)] duration-200 text-white rounded-2xl'>{category === "all" ? "All Products" : category}</Link>)
                })}
            </div>
        </div>
    )
}

export default CategoriesSection
