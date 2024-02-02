import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Product from '../../Components/Product/Product';

const Search = () => {

    let { query } = useParams();
    query = query.toLowerCase();

    const { products } = useSelector((state) => state.products);
    const [searchData, setSearchData] = useState();

    const searchProducts = () => {
        if (query != "") {
            let result = [];
            products?.filter((product) => {

                if (product.subCategory.includes(query)) {
                    result.push(product);
                }
                else if (product.name.includes(query)) {
                    result.push(product);
                }
                else if (product.category.includes(query)) {
                    result.push(product);
                }
                else {
                    // product?.allTags.forEach((tag) => {
                    //     if (tag.includes(searchVal)) {
                    //         result.push(product);
                    //     }
                    //    
                    // })

                    for (let i = 0; i < product?.allTags?.length; i++) {

                        if (product?.allTags[i].includes(query)) {
                            result.push(product);
                            break;
                        }
                    }

                }

            })
            setSearchData(result);
        }
    }

    useEffect(() => {
        searchProducts();
    }, [products, query])


    return (
        <div className='searchPage'>
            <Container className={'my-20'}>
                {searchData?.length > 0 ? (
                    <div>

                        <h1 className='my-10 text-2xl capitalize'>Search results for: {query}</h1>
                        <div className='flex gap-16  flex-wrap justify-center md:justify-normal'>

                            {searchData?.map((product) => {
                                return (
                                    <Product key={product.id} product={product} />
                                )
                            })}

                        </div>
                    </div>
                ) : (<div className='flex justify-center'>
                    <p className='font-bold'>No Results Found</p>
                </div>)}
            </Container>
        </div>
    )
}

export default Search
