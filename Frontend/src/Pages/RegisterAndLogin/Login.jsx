import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../Store/AuthSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/login`, { email, password });

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setAuth({ user: res.data.user, token: res.data.token }));
                localStorage.setItem("auth", JSON.stringify(res.data));
                // state is being sent from Spinner.jsx so that as soon as user logs in they will be sent to the page they wanted to go 
                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message)
            }
            console.log(res);

        } catch (error) {
            console.log(error);
        }

    }
    // #FCE3FE
    return (
        <div className={`min-h-[calc(100vh-80px)] flex justify-center items-center px-[40px] bg-[color:var(--ecom-login-bg)] `}>

            <Container className={`m-6 flex-1 flex justify-center p-2`}>
                <form className={`registerForm bg-white flex flex-col gap-4 shadow-2xl p-10 rounded w-96`}>
                    <h2 className={`text-4xl font-bold mb-4`}>Sign In</h2>

                    <input
                        className='border-2 p-2'
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='border-2 p-2'
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className='bg-[color:var(--ecom-text-bg)] hover:bg-[color:var(--ecom-text-hover-bg)]  duration-300 text-white text-xl rounded-xl w-32 p-4 cursor-pointer'
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                    <p className='text-gray-600'>Don't have an account ? <Link to="/register" className='text-[#FF4141]'>Sign up here</Link></p>
                </form>

            </Container>
        </div>
    )
}

export default Login
