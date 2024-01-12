import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import Login from '../Pages/RegisterAndLogin/Login';
import { setAuth } from '../Store/AuthSlice';
import { toast } from 'react-toastify';



const Auth = () => {
    const [success, setSuccess] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()


    const location = useLocation()
    const [path, setPath] = useState();

    const dispatch = useDispatch();
    const handleAuth = async () => {


        try {
            if (user?.user.role) {
                console.log("Role is true");
                const res = await axios(`${import.meta.env.VITE_API}/user/admin-auth`, {
                    headers: {
                        "Authorization": user?.token
                    }
                })

                if (res.data.ok) {
                    setSuccess(true);
                }
                else {
                    console.log("User is not admin");
                    navigate('/login')
                }

            }


        } catch (error) {

            console.log("Error in Admin Auth.jsx", error);
            toast.error(error.response.data.message);
            dispatch(setAuth({}));
            localStorage.removeItem("auth");
        }

    }

    useEffect(() => {
        // If its an admin means role is true
        if (user?.user?.role) {
            handleAuth();
        }
        // If its not an admin but a standard user thats logged in who is trying to access this route send him to home page
        else if (user?.user) {
            setPath('/');
        }
        // else in Spinner we have passed the default value to send to /login page so in case we don't have any logged in users who are trying to access any protected admin route we will send them to login page
    }, [user?.user])


    // return success === "Admin" ? <AdminDashboard /> : (success === 'User' ? <UserDashboard /> : <Spinner text={`Unauthorized Access. Redirecting in ${time}`} />)

    return success ? <Outlet /> : <Spinner path={path} />

}

export default Auth
