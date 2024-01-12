import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import Login from '../Pages/RegisterAndLogin/Login';
import { toast } from 'react-toastify';
import { setAuth } from '../Store/AuthSlice';



const UserAuth = () => {
    const [success, setSuccess] = useState(false);


    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()


    const location = useLocation()
    const dispatch = useDispatch();

    const handleAuth = async () => {


        try {

            const res = await axios(`${import.meta.env.VITE_API}/user/user-auth`, {
                headers: {
                    "Authorization": user?.token
                }
            })

            if (res?.data?.ok) {
                setSuccess(true)
            }
            else {
                console.log("User is not logged in");
                navigate('/login')

            }
        } catch (error) {
            console.log("Error in UserAuth.jsx", error);
            toast.error(error.response.data.message);
            dispatch(setAuth({}));
            localStorage.removeItem("auth");
        }





    }

    useEffect(() => {
        if (user?.user) {
            handleAuth();
        }
    }, [user?.user])


    // return success === "Admin" ? <AdminDashboard /> : (success === 'User' ? <UserDashboard /> : <Spinner text={`Unauthorized Access. Redirecting in ${time}`} />)

    return success ? <Outlet /> : <Spinner />

}

export default UserAuth
