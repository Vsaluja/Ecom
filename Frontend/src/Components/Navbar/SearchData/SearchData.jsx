import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Container from '../../Container/Container';
import './SearchData.scss';
import { Link } from 'react-router-dom';


const SearchData = ({ searchVal, searchOpen }) => {

    searchVal = searchVal.toLowerCase();
    const { products } = useSelector((state) => state.products);
    const [searchData, setSearchData] = useState();

    const searchProducts = () => {
        if (searchVal != "") {
            let result = [];
            products?.filter((product) => {
                if (product.name.includes(searchVal)) {
                    result.push(product);
                }
                else if (product.category.includes(searchVal)) {
                    result.push(product);
                }
                else if (product.subCategory.includes(searchVal)) {
                    result.push(product);
                }

            })
            setSearchData(result);
        }
    }

    useEffect(() => {
        searchProducts();
    }, [searchVal])

    return (
        <>
            {searchVal && (
                <div className='searchData absolute z-10 top-[130px] lg:top-[90px] left-0 w-full h-[400px] bg-white border-2 border-t-0  rounded rounded-t-none p-2'>
                    <Container className={`h-full w-full`}>
                        <div className="searchItems h-full w-full flex flex-col gap-4 overflow-x-hidden">
                            {searchData?.map((product) => {

                                return (
                                    <Link to={`/display/${product.id}`} className="searchItem flex gap-6 rounded border-b-2 p-2">
                                        <div className="img  sm:max-w-[50px]">
                                            <img className='min-w-[50px]' src={product.image} alt="" />
                                        </div>
                                        <div className="name capitalize">
                                            <p>
                                                {product.name}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </Container>
                    {searchData?.length === 0 && (
                        <div className='absolute top-[150px] left-[30%] md:left-[40%] text-[18px] sm:text-[30px] font-bold text-gray-500'>No Results Found</div>
                    )}
                </div>
            )}
        </>
    )
}

export default SearchData
