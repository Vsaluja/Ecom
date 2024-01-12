import React, { useEffect } from 'react'
import Container from '../../../Components/Container/Container'
import AdminNav from '../AdminNav/AdminNav'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import noImage from '/images/noImage.png';
import "./Style.scss";

const ProductDetails = () => {

    const { products } = useSelector((state) => state.products);

    useEffect(() => {

    }, [])


    return (
        <div className='flex-1 bg-[color:var(--admin-body-bg)] py-5'>
            <Container className={`relative min-h-full`}>
                <AdminNav />
                <div className="box relative bg-white  min-h-full rounded-2xl flex flex-col gap-4 shadow-2xl m-2 md:m-4 lg:m-10 lg:p-10">

                    <Link className='absolute text-sm top-[60px] right-[10px] lg:top-[10px] lg:right-[10px] p-2 text-white bg-black rounded' to='/dashboard/admin/productdetails/add'>Add Product</Link>

                    <div className='my-10 w-full  px-2 lg:px-10 border-b-4 border-[color:var(--ecom-font-bg)] py-6 flex justify-between items-center'>
                        <h2 className='text-2xl  md:text-3xl  lg:text-5xl font-bold text-[color:var(--admin-text)]'>All Products</h2>
                        <div className='hidden  userSearch lg:flex   border-black  max-w-[300px]'>
                            <input type="text" className='border-2 rounded-s-3xl outline-none max-w-[90px]  md:max-w-[150px] p-[5px] lg:p-[10px]  lg:max-w-[230px] ' />
                            <button className='text-sm text-white lg:px-[15px] lg:px-2 rounded-e-3xl bg-black'>Search</button>
                        </div>

                    </div>
                    {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 */}
                    <div className="products flex justify-evenly  gap-[10px] flex-wrap">
                        {products?.map((product) => {
                            return (
                                <div key={product.id} onClick={() => console.log(product.id)} className='product max-w-[170px] md:max-w-[200px] flex flex-col  items-center  gap-2 cursor-pointer bg-gray-100 p-2 rounded shadow-2xl text-center mb-16'>
                                    <p className=''>#{product.id}</p>
                                    <img className='rounded' src={`${import.meta.env.VITE_API}/products/${product.image}`} onError={(e) => { e.target.onError = null; e.target.src = noImage }} alt="" />
                                    <p className='name capitalize'>{product.name}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default ProductDetails
