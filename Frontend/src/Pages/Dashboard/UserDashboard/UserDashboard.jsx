import React, { useEffect, useState } from 'react'
import Container from '../../../Components/Container/Container'
import { MdShoppingCart } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import Settings from './Settings/Settings';
import { Link, useLocation } from 'react-router-dom';

const UserDashboard = () => {

    const [nav, setNav] = useState(1);
    const location = useLocation();
    const handleNav = () => {

        const url = location.pathname.toLowerCase();

        if (url === "/dashboard/user/orders") {
            setNav(1);
        }
        if (url === "/dashboard/user/settings") {
            setNav(2);
        }

        console.log("loc", location);

    }

    useEffect(() => {
        handleNav();
    }, [location])

    return (
        <div className='userDashboard'>
            <Container className={``}>
                <div className="nav bg-gray-200 w-full flex justify-center items-center py-4 sm:px-4 sm:gap-10 font-bold rounded">
                    <Link to="/dashboard/user/orders" className={`orders flex items-center gap-2 p-2 sm:px-4 sm:py-[10px] rounded hover:bg-red-500 hover:text-white duration-300  cursor-pointer ${nav === 1 ? "bg-red-500 text-white" : "text-[#3b3c3d]"}`}>
                        <MdShoppingCart className='sm:text-[25px]' />
                        <button className='sm:text-[20px]'>My Orders</button>
                    </Link>

                    <Link to="/dashboard/user/settings" className={`settings flex items-center gap-2 p-2 sm:px-4 sm:py-[10px] rounded hover:bg-red-500 hover:text-white duration-300 cursor-pointer focus:bg-red-500 ${nav === 2 ? "bg-red-500 text-white" : "text-[#3b3c3d]"}`}>
                        <IoIosSettings className='sm:text-[25px]' />
                        <button className='sm:text-[20px]'>Settings</button>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default UserDashboard
