import React, { useEffect, useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsArrowRightSquareFill } from "react-icons/bs";
import './Style.scss';

const AdminNav = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const location = useLocation();



    const [active, setActive] = useState();


    const handleResponsiveNav = () => {
        setOpen((prev) => !prev)
    }

    // To facilitate the admin nav it will add active class based on what the url is
    useEffect(() => {
        if (location.pathname === "/dashboard/admin") {

            setActive(1);
        }
        else if (location.pathname.includes("/userdetails")) {

            setActive(2);
        }
        else if (location.pathname.includes("/productdetails")) {

            setActive(3);
        }
    }, [location])

    return (
        <div className={`adminNav absolute w-[100px] h-[100%] z-30  rounded  top-[0px] ${open ? "box-shadow slideRight left-[-1px]" : "slideBack left-[-120px]"}`}>
            <BsArrowRightSquareFill className={`btn text-5xl text-black ${open ? "opacity-100" : "opacity-20"} absolute z-20 top-4 left-[100px]`} onClick={handleResponsiveNav} />
            <div className={`h-[100%]  bg-black px-2 ${open ? "flex" : "display"} py-10 z-30 rounded  top-[0px] bg-black xl:flex flex-col gap-10`}>

                <div className={`text-center cursor-pointer ${active === 1 ? "active" : "text-white"}  rounded p-1 flex flex-col  justify-center items-center gap-1 text-lg`} onClick={() => { navigate('/dashboard/admin') }}>
                    <MdDashboard className='font-bold text-[25px] flex-1' />
                    <p className='font-bold text-[12px] '>Dashboard</p>
                </div>
                <div className={`text-center cursor-pointer ${active === 2 ? "active" : "text-white"}  rounded p-1 flex flex-col  justify-center items-center gap-1 text-lg`} onClick={() => { navigate('/dashboard/admin/userdetails') }}>

                    <FaUserFriends className='font-bold  text-[25px] flex-1' />
                    <p className='font-bold  text-[12px] '>Users</p>
                </div>
                <div className={`text-center cursor-pointer ${active === 3 ? "active" : "text-white"}  rounded p-1 flex flex-col  justify-center items-center gap-1 text-lg`} onClick={() => { navigate('/dashboard/admin/productdetails') }}>

                    <MdInventory className='font-bold text-[25px] flex-1' />
                    <p className='font-bold text-[12px] '>Products</p>

                </div>
            </div>


        </div>
    )
}

export default AdminNav
