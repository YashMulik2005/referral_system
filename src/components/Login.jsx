import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import customhook from './Context';
import { BeatLoader } from 'react-spinners'
import photo from "../assets/login.png"


function Login() {
    const navigate = useNavigate()
    const { login, user, setlogin, setuser } = customhook()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loding, setloding] = useState(false)

    const handleSubmit = async (e) => {
        setloding(true)
        e.preventDefault()

        const res = await axios.post("http://localhost:3000/user/login", { username: username, password: password });
        console.log(res);
        if (res.data.data.sucess) {
            setlogin(true);
            setuser(username)
            localStorage.setItem("username", username)
            navigate("/")
        }
        else {
            toast.error("Invalid username or password !!!!")
        }
        setloding(false)
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className='w-[80%] flex flex-col sm:flex-row sm:h-[80vh] border-[1px] rounded-md shadow-xl '>
                <div className=' w-[100%] sm:w-[50%] flex flex-col justify-center items-center py-5 sm:py-0'>
                    <h1 className=' font-bold text-3xl text-center text-blue-700'>LOGIN</h1>
                    <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center  w-[100%] '>

                        <div className=' w-[80%]'>
                            <label className=' font-bold text-lg my-2'>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => {
                                    setusername(e.target.value)
                                }}
                                required
                                className=' border-[1px] rounded-xl px-3 py-[3px] w-[100%] focus:outline-none'
                            />
                        </div>

                        <div className=' w-[80%] '>
                            <label className=' font-bold text-lg my-2'>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setpassword(e.target.value)
                                }}
                                required
                                className=' border-[1px] rounded-xl px-3 py-[3px] w-[100%] focus:outline-none'
                            />
                        </div>

                        <button type="submit" className=' bg-blue-700 text-white font-semibold px-3 py-[4px] rounded-3xl my-2 w-[70%]'>{loding ? <BeatLoader color='white' size={10} /> : "Login"}</button>
                    </form>
                </div>
                <div className=' w-[50%] bg-blue-100 hidden sm:block '>
                    <img src={photo} alt="" className=' w-[100%] h-[100%]' />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Login