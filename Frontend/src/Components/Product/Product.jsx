import React, { useEffect } from 'react'
import './Style.scss';
import noImage from '/images/noImage.png';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className='product mt-6 rounded max-w-[150px] md:max-w-[250px] lg:max-w-[260px]  p-[5px] flex flex-col gap-2  justify-between hover:scale-110   duration-200 bg-white cursor-pointer' onClick={() => navigate(`/display/${product.id}`)}>
            {/* onError handles if the image doesnt load to will take the noImage */}

            <img className='w-full rounded' src={`${import.meta.env.VITE_API}/products/${product.image}`} onError={(e) => { e.target.onError = null; e.target.src = noImage }} alt="" />

            {/* Actual code from reddit */}
            {/* <img src={imageSrc} onError={(e)=>{e.target.onError = null; e.target.src = fallbackSrc}}/> */}

            <p className='name text-lg capitalize'>{product.name}</p>
            <div className='price '>
                {product.price.oldPrice != 0 && <p className='line-through text-gray-400 text-md'>${product.price.oldPrice}</p>}
                <p className='text-xl'>${(product.price.orgPrice).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default Product
