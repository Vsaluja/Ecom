import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import { addToCart, reduceFromCart } from '../../Store/ProductsSlice';
import { toast } from 'react-toastify';

const ProductDisplay = () => {

    const { products, cart } = useSelector((state) => state.products);

    const { id } = useParams();
    const [product, setProduct] = useState();
    const [btn, setBtn] = useState(false);
    const [qty, setQty] = useState();

    const dispatch = useDispatch();

    const findProduct = () => {
        const result = products?.find((product) => {
            return product.id === Number(id);
        })
        setProduct(result);
    }

    const findQty = () => {


        const quantity = cart?.find((item) => {
            return item.id === product?.id;
        })

        setQty(quantity?.quantity);
        if (qty > 1) {
            setBtn(true);
        }

    }



    const handleAdd = () => {
        // Providing the entire product json obj
        dispatch(addToCart(product));
        setBtn(true);
    }

    const handleReduce = () => {
        // Only providing the id
        if (qty == 1) {
            console.log("Hit ");
            setBtn(false)
        }

        dispatch(reduceFromCart(product.id))

    }




    useEffect(() => {
        findProduct();


    }, [products, id])

    useEffect(() => {
        findQty();
    }, [product, cart, qty])


    return (
        <div className='productDisplay '>
            <Container className={`py-10 flex flex-col lg:flex-row lg:gap-20`}>
                <div className="left flex justify-center">
                    <img className='lg:min-w-[400px]' src={`${import.meta.env.VITE_API}/products/${product?.image}`} alt="" />
                </div>
                <div className="right flex mt-10 lg:mt-0 flex-col gap-6 w-full lg:w-1/2">
                    <h2 className='capitalize text-[30px] font-bold text-[#3D3D3D]'>{product?.name}</h2>
                    <div className="price flex gap-10 items-center font-bold">
                        {product?.price.oldPrice !== 0 && (<p className='text-[20px] line-through text-gray-400'>${product?.price.oldPrice}</p>)}
                        <p className='text-[25px] text-red-600'>${product?.price.orgPrice}</p>
                    </div>
                    <div className="descriptio capitalize">
                        {product?.description}
                    </div>
                    <div className="addToCart flex flex-col gap-8 w-[150px]">
                        <button onClick={() => { toast.success("Added to cart"); handleAdd(); }} className='bg-[#DF3535]  hover:bg-red-600 duration-200 text-white py-4 rounded-2xl mt-4 px-4 w-[150px]'>Add To Cart</button>
                        {btn && (

                            <div className=' text-black flex w-full justify-between font-normal'>
                                <button onClick={handleReduce} className='text-[20px]'>-</button>
                                <div className="qty bg-gray-300 rounded px-[15px] py-[5px]">{qty}</div>
                                <button onClick={handleAdd} className='text-[20px]'>+</button>
                            </div>
                        )}

                    </div>
                    <div className="category">
                        <span >Category: </span>
                        <span className='text-gray-400 capitalize'>{product?.subCategory}, </span>
                        <span className='text-gray-400 capitalize'>{product?.category}</span>
                    </div>
                </div>
            </Container >
            <div className='mt-32'>

                <RelatedProducts category={product?.category} subCategory={product?.subCategory} />
            </div>
        </div >
    )
}

export default ProductDisplay
