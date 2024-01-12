import React, { useEffect, useState } from 'react'
import Container from '../../../Components/Container/Container'
import AdminNav from '../AdminNav/AdminNav'
import { MdModeEditOutline } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import './Style.scss';



const UserDetails = () => {

    const [users, setUsers] = useState();
    const { allUsers } = useSelector((state) => state.auth);



    useEffect(() => {
        setUsers(allUsers);
    }, [])

    return (
        <div className='flex-1 flex bg-[color:var(--admin-body-bg)] py-5'>
            <Container className={`relative min-h-full flex px-4`}>
                <AdminNav />
                <div className="box text-white w-full min-h-full rounded-2xl flex flex-col gap-4 my-10 lg:m-10 lg:p-10 ">


                    <div className='my-10 w-full px-10 border-b-4 border-black py-6 flex justify-between items-center'>
                        <h2 className='text-2xl  md:text-3xl  lg:text-5xl font-bold text-black'>All Users</h2>
                        <div className='hidden  userSearch lg:flex    max-w-[300px]'>
                            <input type="text" className='border-2 text-black rounded-s-3xl outline-none max-w-[90px]  md:max-w-[150px] p-[5px] lg:p-[10px]  lg:max-w-[230px] ' placeholder='Search user...' />
                            <button className='text-sm text-white lg:px-[15px] lg:px-2 rounded-e-3xl bg-black'>Search</button>
                        </div>
                    </div>
                    <div className="userDetails  gap-[5px] text-lg grid grid-cols-4 text-center mb-4 border-b-4 text-black font-bold py-4 px-2 -mt-[8px] lg:text-2xl">
                        <div className='row wrap flex justify-center items-center'>First Name</div>
                        <div className='row wrap flex justify-center items-center'>Last Name</div>
                        <div className='flex justify-center items-center'>Email</div>
                        <div className='flex justify-center items-center'>Role</div>
                    </div>
                    {users?.map((user) => {
                        return (
                            <div key={user._id}>
                                <div className="userDetails grid grid-cols-4 text-center gap-2 bg-gray-200 font-bold text-xl text-black rounded my-6 py-8 px-2 relative ">
                                    <div className="firstName">

                                        <span className='capitalize  text-[16px] lg:text-lg'> {user.firstName}</span>
                                    </div>
                                    <div className="lastName ">

                                        <span className='capitalize text-[16px] lg:text-lg'> {user.lastName}</span>
                                    </div>
                                    <div className="email  lg:max-w-full">

                                        <span className='text-[14px] max-w-[10px] lg:text-lg break-words'> {user.email}</span>
                                    </div>
                                    <div className="role lg:text-lg">

                                        <span className={`capitalize  p-[3px]  text-[12px] lg:text-lg rounded ${user.role ? "bg-green-400" : ""}`}> {user.role ? "Admin" : "Standard"}</span>
                                    </div>

                                    <div className="buttons absolute flex items-center gap-2 right-[4px]">
                                        <button className='text-blue-300 font-bold'><MdModeEditOutline /></button>
                                        <IoCloseCircleSharp className='text-red-500 text-[25px] cursor-pointer' />

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default UserDetails
