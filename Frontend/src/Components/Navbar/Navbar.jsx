import React, { useEffect, useRef, useState } from 'react'
import './Navbar.scss';
import Container from '../Container/Container';
import logo from '/images/logo.png'
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { setAuth } from '../../Store/AuthSlice';
import { toast } from 'react-toastify';
import { setCart } from '../../Store/ProductsSlice';
import SearchData from './SearchData/SearchData';


const Navbar = () => {

    const [mobile, setMobile] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [totalCart, setTotalCart] = useState();
    const { cart } = useSelector((state) => state.products);
    const { user, adminNav } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const handleMenu = () => {
        setMobile((prev) => !prev);
        setSearch(false);
    }
    const handleSearch = () => {
        setSearch((prev) => !prev);
        setMobile(false)
        setSearchVal("");

    }




    const handleLogout = () => {
        localStorage.removeItem("auth");
        dispatch(setAuth({}));
        dispatch(setCart([]));
        navigate('/');
        toast.success("Successfully signed out")
    }

    const getTotalCart = () => {
        let total = 0;

        for (const product of cart) {
            total += product.quantity;
        }

        setTotalCart(total);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setSearch(false)
        setMobile(false)
        setSearchVal("");
    }, [location])

    useEffect(() => {
        if (cart.length > 0) {
            getTotalCart();
        }
        else {
            setTotalCart(0);
        }

    }, [cart])


    return (
        <div className='navbar border-b-2 bg-white border-gray-200'>
            <Container className="flex gap-4 text-gray-800 justify-between items-center relative">
                <Link to="/" className="logo flex items-center gap-2 cursor-pointer">
                    <img src={logo} alt="" className='w-12 lg:w-16' />
                    <h2 className='text-2xl lg:text-4xl font-bold'>Shoppe.</h2>
                </Link>

                <div className={`search border-2 bg-gray-100 lg:rounded-3xl lg:flex items-center p-2 gap-3 ${search ? "anim absolute flex justify-between border-b-2 top-[70px] w-full left-0  p-4 z-20" : "hidden"}`}>

                    <CiSearch className='hidden lg:block' />

                    <input className='w-full bg-gray-100  lg:placeholder:text-lg lg:text-lg lg:min-w-[320px] outline-none' type="text" placeholder='Search for products, brands and more' value={searchVal} onChange={(e) => setSearchVal(e.target.value)} onKeyUp={(e) => { e.key === "Enter" && navigate(`/search/${searchVal}`) }} />

                    <IoMdClose className={`${search ? "block" : "hidden"}`} onClick={handleSearch} />
                </div>
                <div className={`navItems lg:flex items-center gap-4 lg:gap-10 ${mobile ? "anim flex absolute flex-col top-[70px] w-full left-0 bg-white  items-center justify-center object-bottom min-h-10 p-6 border-b-2 z-50" : "hidden"}`}>

                    <div className={`flex justify-center items-center gap-4 ${mobile ? "flex-col" : ""}`}>
                        <Link to="/category/all/mens" className='text-lg lg:font-semibold hover:text-[#212121] text-gray-700 duration-300'>Men</Link>
                        <Link to="/category/all/womens" className='text-lg lg:font-semibold hover:text-[#212121] text-gray-700 duration-300'>Women</Link>
                        <Link to="/category/all/kids" className='text-lg lg:font-semibold hover:text-[#212121] text-gray-700 duration-300'>Kids</Link>
                    </div>
                    {user?.user ? (
                        <div className='profileContainer flex gap-2 items-center justify-center relative '>
                            <CgProfile className=' text-2xl lg:text-2xl text-gray-700 cursor-pointer' />
                            <h3 className='capitalize cursor-pointer'>{user?.user.firstName}</h3>
                            <IoIosArrowDropdownCircle className='cursor-pointer' />
                            <div className="content hidden absolute  w-[180px] border-2 border-t-0 min-h-20 bg-white top-6 left-[-30px] flex flex-col items-center justify-center pt-10 pb-4 text-center gap-6 font-bold">
                                {user?.user?.role ? (
                                    <>
                                        <Link to={`/dashboard/user/settings`} className=' text-md'>Profile</Link>
                                        <Link to={`/dashboard/admin`} className='text-md'>Admin Panel</Link>
                                    </>
                                ) : (

                                    <Link to={`/dashboard/user/settings`} className='text-md'>Profile</Link>
                                )}
                                <button className='text-md text-red-600' onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link className='loginBtn py-[4px] px-6 text-lg border-[#212121] border-2 rounded-xl hover:bg-[#212121] hover:text-white duration-300' to={`/login`}>Login</Link>
                    )}
                    <Link to="/cart" className='hidden lg:block flex flex-col items-center justify-center cursor-pointer hover:text-[#212121] duration-300 relative'>
                        <LuShoppingCart className='text-2xl lg:text-2xl text-gray-700 hover:text-[#212121] duration-300' />
                        <h3>Cart</h3>
                        {totalCart > 0 && (

                            <span className='absolute text-white text-bold bg-red-500 text-sm px-[10px] py-[5px] rounded-3xl top-[-10px] right-[-15px]'>{totalCart}</span>
                        )}
                    </Link>

                </div>

                {/* Mobile Devices */}
                <div className="phone flex gap-4 lg:hidden">

                    <CiSearch className='text-2xl' onClick={handleSearch} />

                    <div className='relative '>
                        <Link to="/cart" ><LuShoppingCart className='text-2xl lg:text-4xl text-gray-700' /></Link>
                        {totalCart > 0 && (

                            <span className='absolute text-white text-bold bg-red-500 text-xs px-[10px] py-[5px] rounded-3xl top-[-15px] right-[-15px]'>{totalCart}</span>
                        )}
                    </div>
                    <AiOutlineMenu className='lg:hidden text-2xl text-black' onClick={handleMenu} />


                </div>

                <SearchData searchVal={searchVal} searchOpen={search} />
            </Container>
        </div>
    )
}

export default Navbar
