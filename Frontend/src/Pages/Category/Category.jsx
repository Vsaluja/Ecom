import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Product from '../../Components/Product/Product';
import mens from '/images/mensBanner.png';
import womens from '/images/womensBanner.png';

const Category = () => {

    const { category, subCategory } = useParams();
    const { products } = useSelector((state) => state.products);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [banner, setBanner] = useState();


    const filterProducts = () => {
        // To find all the products
        if (category === "all" && !subCategory) {
            setFilteredProducts(products);
            return;
        }

        // For only categories if we click on electronics it will show only products that have electronics as category in them
        // /all or /electronics or /clothing etc
        if (!subCategory) {
            const update = products?.filter((product) => {
                return product?.category === category;
            })
            setFilteredProducts(update);
            return;
        }

        // If the category is all and there is also subCategory like mens womens kids. In navbar we have set url to be showing us all the products related to men women and kids /all/mens
        if (category == "all" && subCategory) {

            const update = products?.filter((product) => {
                return product?.subCategory === subCategory;
            })
            setFilteredProducts(update);
        }
        // If the category is not all then like if category is /clothing/mens
        else {
            const update = products?.filter((product) => {
                return (product?.category === category && product?.subCategory === subCategory);
            })
            setFilteredProducts(update);
        }
    }

    const bannerFunc = () => {
        if (subCategory == "mens") {
            setBanner(mens)
        }
        if (subCategory == "womens") {
            setBanner(womens)
        }
    }

    useEffect(() => {
        filterProducts();
        bannerFunc();
    }, [products, category, subCategory])


    return (
        <div>
            <Container className={`mb-10`}>
                <img src={banner} alt="" />
                <h3 className='text-2xl mt-10'>Shop in <span className='capitalize'>{subCategory || category}</span></h3>

                <div className='flex gap-4 flex-wrap justify-around'>

                    {filteredProducts?.map((product) => {
                        return (
                            <Product key={product._id} product={product} />
                        )
                    })}

                </div>

            </Container>
        </div>
    )
}

export default Category
