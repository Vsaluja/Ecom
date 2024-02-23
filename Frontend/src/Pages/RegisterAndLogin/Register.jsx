import React, { useState } from 'react'
import Container from '../../Components/Container/Container'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/register`, { firstName, lastName, email, password })
            console.log(res);
            if (res.data.success) {
                toast.success("You have registered successfully");
                navigate('/login');
            }
            else {
                toast.error(res.data.message);
            }

            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("");

        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div className='min-h-[calc(100vh-80px)] py-[20px] px-[40px] bg-[color:var(--ecom-login-bg)] '>
            <Container className={`m-6 flex-grow flex justify-center p-2`}>
                <form onSubmit={handleRegister} className={`registerForm bg-white flex flex-col gap-4 shadow-2xl p-10 rounded w-96`}>
                    <h2 className={`text-4xl font-bold mb-4`}>Sign up</h2>
                    <input
                        className='border-2 p-2'
                        type="text"
                        placeholder='First Name'
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className='border-2 p-2'
                        type="text"
                        placeholder='Last Name'
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
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
                    >
                        Sign Up
                    </button>
                    <div>
                        <p className='text-gray-600'>Already have an account ? <Link to="/login" className='text-[#FF4141]'>Login here</Link></p>
                    </div>
                </form>

            </Container>
        </div>
    )
}

export default Register
