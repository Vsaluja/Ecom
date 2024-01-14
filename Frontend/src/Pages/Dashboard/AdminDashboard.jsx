import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import AdminNav from './AdminNav/AdminNav';
import './Admin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../Store/AuthSlice';
import axios from 'axios';
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const AdminDashboard = () => {

    const [users, setUsers] = useState();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)

    const getUsers = async () => {
        try {
            const res = await axios(`${import.meta.env.VITE_API}/user/allUsers`);
            setUsers(res?.data?.usersData);
            dispatch(setAllUsers(res?.data?.usersData))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("Admin Dashboard");
        getUsers();
    }, [])


    return (
        <div className='flex-1 flex  py-5 bg-[color:var(--admin-body-bg)]'>
            <Container className={'relative  flex flex-col'}>

                <AdminNav />
                <div className='flex justify-around items-start my-20 flex-wrap gap-20'>

                    <div className="box bg-[#252525]  rounded-2xl w-[280px] sm:w-[500px] h-[250px] rounded p-4 flex flex-col items-center justify-center  gap-10 text-white">
                        <div className='flex sm:gap-4 lg:gap-20 items-center justify-center'>
                            <FaUserFriends className='font-bold text-[40px]  md:text-[80px] ' />
                            <p className='font-bold text-[25px] lg:text-[40px]'>Total Users</p>
                        </div>
                        <h2 className='font-bold text-[40px]'>{users?.length}</h2>
                    </div>
                    <div className="box bg-black rounded-2xl w-[280px] sm:w-[500px] h-[250px] rounded p-4 flex flex-col items-center justify-center  gap-10 text-white ">
                        <div className='flex gap-4 md:gap-10 lg:gap-20 items-center justify-center'>

                            <MdInventory className='font-bold text-[40px]  md:text-[80px] ' />
                            <p className='font-bold text-[25px] lg:text-[40px] '>Total Products</p>
                        </div>
                        <h2 className='font-bold text-[40px]'>{products?.length}</h2>
                    </div>
                    <div className="box bg-black rounded-2xl w-[280px] sm:w-[500px] h-[250px] rounded p-4 flex flex-col items-center justify-center  gap-10 text-white ">
                        <div className='flex sm:gap-4 lg:gap-20 items-center justify-center'>

                            <MdInventory className='font-bold  text-[80px] ' />
                            <p className='font-bold text-[25px] lg:text-[40px] '>Total Products</p>
                        </div>
                        <h2 className='font-bold text-[40px]'>{products?.length}</h2>
                    </div>

                </div>

            </Container>
        </div>
    )
}

export default AdminDashboard
