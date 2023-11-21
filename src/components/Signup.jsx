import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners'
import photo from '../assets/signup.png'

function Signup() {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [referredby, setreferredby] = useState("")
    const [loding, setloding] = useState(false)

    const handleSubmit = async (e) => {
        setloding(true)
        e.preventDefault()

        const res = await axios.post("http://localhost:3000/user/signup", { username: username, password: password, email: email, referredby: referredby });
        console.log(res);
        if (res.data.data.sucess) {
            navigate("/login")
        }
        else if (res.data.data.error) {
            toast.error("Invalid refferal code")
        }
        else {
            toast.success("Username is not available")
        }
        setloding(false)
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className='w-[80%] flex sm:h-[80vh] border-[1px] rounded-md shadow-xl flex-col sm:flex-row'>
                <div className=' w-[100%] sm:w-[50%] bg-blue-100 '>
                    <img src={photo} alt="" className=' w-[100%] h-[100%] hidden sm:block ' />
                </div>
                <div className=' w-[100%] sm:w-[50%] flex flex-col justify-center items-center py-5 sm:py-0 '>
                    <h1 className=' font-bold text-3xl text-center text-blue-700'>SIGNUP</h1>
                    <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center  w-[100%] '>
                        <div className=' w-[80%]'>
                            <label className=' font-bold text-lg my-2'>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={email} required
                                onChange={(e) => {
                                    setemail(e.target.value)
                                }}
                                className=' border-[1px] rounded-xl px-3 py-[3px] w-[100%] focus:outline-none' />
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
                        <div className=' w-[80%]'>
                            <label className=' font-bold text-lg my-2'>Referred By:</label>
                            <input
                                type="text"
                                name="referredBy"
                                value={referredby}
                                onChange={(e) => {
                                    setreferredby(e.target.value)
                                }}
                                className=' border-[1px] rounded-xl px-3 py-[3px] w-[100%] focus:outline-none'
                            />
                        </div>
                        <button type="submit" className=' bg-blue-700 text-white font-semibold px-3 py-[4px] rounded-3xl my-2 w-[70%]'>{loding ? <BeatLoader color='white' size={10} /> : "Signup"}</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Signup