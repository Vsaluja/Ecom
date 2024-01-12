import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserDashboard from '../UserDashboard';
import Container from '../../../../Components/Container/Container';
import { toast } from 'react-toastify';

const Settings = () => {

    const [password, setPassword] = useState("");

    const { user } = useSelector((state) => state.auth);

    const updateDetails = async (e) => {
        e.preventDefault();
        if (password.length > 3) {

            try {
                const res = await axios.post(`${import.meta.env.VITE_API}/user/update`, { email: user?.user?.email, password: password })

                console.log(res);

                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    setPassword("");
                }
                else {
                    toast.error(res?.data?.message);
                }

            } catch (error) {
                console.log("Error in updating", error);
            }
        }
        else {
            alert("Password must be atleast 3 characters")
        }


    }


    useEffect(() => {
    }, [user?.user])

    return (<>
        <UserDashboard />
        <Container>

            <div className='flex-1 settings py-2 px-6 my-2 bg-gray-800 rounded'>
                <h2 className='text-center text-[40px] text-white font-bold'>Settings</h2>
                <form action="" className='flex my-4 flex-col p-4 bg-white max-w-[500px] mx-auto shadow-2xl rounded gap-2'>
                    <div className="firstName flex flex-col gap-2 justify-center">
                        <label>First Name</label>
                        <input className='bg-gray-300 p-2 rounded border-none outline-none capitalize' type="text" value={user?.user?.firstName} readOnly />
                    </div>
                    <div className="firstName flex flex-col gap-2 justify-center">
                        <label>Last Name</label>
                        <input className='bg-gray-300 p-2 rounded border-none outline-none capitalize' type="text" value={user?.user?.lastName} readOnly />
                    </div>
                    <div className="firstName flex flex-col gap-2 justify-center">
                        <label>Email</label>
                        <input className='bg-gray-300 p-2 rounded border-none outline-none' type="text" value={user?.user?.email} readOnly />
                    </div>
                    <div className="firstName flex flex-col gap-2 justify-center">
                        <label>Password</label>
                        <input className=' p-2 rounded border-2' type="password" placeholder='Set Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={updateDetails} className='bg-blue-500 hover:bg-blue-600 duration-300 p-2 text-white rounded mt-6'>Update Password</button>
                </form>
            </div>
        </Container>

    </>
    )
}

export default Settings
