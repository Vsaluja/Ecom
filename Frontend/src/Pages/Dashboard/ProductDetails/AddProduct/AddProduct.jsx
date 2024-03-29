import React, { useEffect, useRef, useState } from 'react'
import Container from '../../../../Components/Container/Container'
import axios from 'axios';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import AdminNav from '../../AdminNav/AdminNav';
import './Style.scss';
import { imageDB } from '../../../../../firebaseConfig/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const AddProduct = () => {
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");
    // Individual Tag
    const [tag, setTag] = useState("");
    // list of all tags
    const [allTags, setAllTags] = useState([]);
    const [oldPrice, setOldPrice] = useState(0);



    const { products } = useSelector((state) => state.products);
    // This function compares the id with current id's present in database if id's match it generates a new ID if they don't match it keeps assigns us that unique id
    const uniqueId = () => {
        const random = Math.floor(Math.random() * 500 + 1);

        const existingProduct = products?.find((product) => {
            return product?.id === random;
        })

        if (existingProduct) {
            uniqueId();
        }
        else {
            setId(random);
        }
    }

    const addTag = (e) => {
        // Tags are used for improving search we can add upto 5 tags to a product which are like laptop, gaming, nvidia etc
        e.preventDefault();
        if (allTags?.length < 10 && tag?.length < 15 && tag != "") {

            setAllTags((prev) => [...prev, tag.toLocaleLowerCase()]);
            setTag("");
        }
        else if (tag == "") {
            alert("Unable to insert an empty tag");
        }
        else {
            alert("Can't add more than 10 tags to this product")
        }
    }

    const addImage = (e) => {
        e.preventDefault();
        // first the image is stored in firebase once the image is stored and the url is generated then addProduct function is called to add the product in mongodb along with the image url that is passed in addProduct
        // Storing the image in firebase storage
        const imgRef = ref(imageDB, `products/product_${id}`);

        uploadBytes(imgRef, file)
            .then((img) => {
                getDownloadURL(img.ref)
                    .then((url) => {
                        console.log("myVal", url);
                        addProduct(url)
                    })
            })
    }

    const addProduct = async (imgUrl) => {


        try {


            // hosting images in firebase
            const data = { image: imgUrl, id, name, category, subCategory, price, oldPrice, description, allTags };

            console.log("Data", data);

            const res = await axios.post(`${import.meta.env.VITE_API}/products/add`, data);


            if (res?.data?.success) {
                setId("");
                setName("");
                setCategory("");
                setSubCategory("");
                setPrice("");
                setOldPrice(0);
                setFile("");
                setDescription("");
                setPreview("");
                toast.success(res.data.message);
                uniqueId();
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Here", error);

        }

    }

    useEffect(() => {
        uniqueId();
    }, [products])




    useEffect(() => {

        if (!file) return;
        setPreview(URL.createObjectURL(file));

    }, [file])

    return (
        <div className='flex-grow py-5 bg-[color:var(--admin-body-bg)]'>
            <Container className={`relative h-[100%] flex flex-col  items-center justify-center`}>
                <AdminNav />
                <div className="addProduct w-full flex items-center my-10 justify-start p-w flex-col-reverse lg:flex-row-reverse gap-10 my-0 h-[100%]">
                    <form onSubmit={addImage} encType='multipart/form-data' className="left w-full max-w-[500px] mx-auto bg-white p-6  flex flex-col rounded lg:max-w-[500px] lg:mx-auto max-h-[500px] overflow-x-hidden gap-2  lg:my-0">
                        <h2 className='text-center text-4xl font-bold text-[#303030] mb-6'>Add a new product</h2>

                        <div className='w-full flex flex-col gap-2'>

                            <label className='text-[$303030] text-md'>Unique Id </label>
                            <input
                                type="text"
                                placeholder='id'
                                required
                                value={id}
                                readOnly
                                className='p-2 w-full border-2 outline-none'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Name </label>
                            <input
                                type="text"
                                maxLength={100}
                                required
                                className='p-2 border-2 outline-none w-full placeholder:text-gray-200'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Category </label>
                            <input
                                type="text"
                                required
                                className='p-2 border-2 outline-none'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div> */}
                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Category</label>
                            <select
                                type="text"
                                required
                                className='p-2 border-2 outline-none'
                                value={category}
                                onLoad={(e) => setCategory(e.target.value)}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {/* Empty first option because otherwise laptop or mens or clothing is automatically selected  in the input but the state doesnt update so now user will have to select an option cant go with the empty option or form wont submit*/}
                                <option></option>
                                <option>Clothing</option>
                                <option>Electronics</option>
                                <option>Footwear</option>
                            </select>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Sub Category</label>
                            <select
                                type="text"
                                required
                                className='p-2 border-2 outline-none'
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                            >
                                {category === "Clothing" || category === "Footwear" ? (
                                    <>
                                        <option></option>
                                        <option>Mens</option>
                                        <option>Womens</option>
                                        <option>Kids</option>
                                    </>

                                ) : (
                                    <>

                                        <option></option>
                                        <option>Laptop</option>
                                        <option>Phone</option>
                                        <option>Headphones</option>
                                    </>
                                )}
                            </select>
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Price</label>
                            <input
                                type="number"
                                required
                                className='p-2 border-2 outline-none'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Previous Price</label>
                            <input
                                type="number"
                                // required
                                className='p-2 border-2 outline-none'
                                value={oldPrice}
                                onChange={(e) => {

                                    setOldPrice(e.target.value)

                                }}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label className=' text-[$303030] text-md'>Description</label>
                            <input
                                type="text"
                                maxLength={500}
                                required
                                className='p-2 border-2 outline-none'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2 '>
                            <label className=' text-[$303030] text-md'>Product Tags</label>
                            {allTags?.length > 0 && (
                                <div className='tags text-[12px] flex gap-[5px] flex-wrap'>
                                    {allTags?.map((tag) => {
                                        return (
                                            <span className='bg-black text-white px-[4px] rounded-full'>{tag}</span>

                                        )
                                    })}
                                </div>
                            )}
                            <div className='flex w-full gap-2'>
                                <input
                                    type="text"
                                    maxLength={15}
                                    placeholder='i.e. Womens, Shoes, Pink etc. (optional)'
                                    className='p-2 border-2 outline-none w-full'
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                <button onClick={addTag} className='bg-black text-white p-2 rounded'>Add</button>
                            </div>
                        </div>

                        <div>
                            <input
                                type='file'
                                accept='image/png, image/jpg, image/jpeg'
                                required
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0]);
                                        console.log("File", e.target.files[0]);
                                    }
                                }}
                                className='p-2 text-black rounded z-10'

                            />
                        </div>



                        <button className='text-xl font-bold rounded mt-4 bg-[black] w-full py-4 px-4 text-white'>Add Product</button>

                    </form>
                    <div className="right w-1/2  mx-auto flex flex-col items-center rounded  ">

                        <h2 className='text-center text-4xl font-bold text-black'>Preview Here</h2>
                        {preview ? (
                            <div className='product rounded mt-2 w-[300px] p-[10px] flex flex-col gap-2 justify-between  duration-200 bg-white '>

                                <img src={preview} alt="" />
                                <p className='text-lg break-words'>{name}</p>
                                <div className='price'>
                                    {oldPrice != 0 && <p className='line-through text-gray-400 text-md'>${oldPrice}</p>}
                                    {price && (

                                        <p className='text-lg'>${(price)}</p>
                                    )}
                                </div>
                            </div>
                        ) : (<div className='min-h-[500px]'></div>)}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AddProduct
