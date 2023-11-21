import React, { useRef, useState } from 'react'
import customhook from './Context'
import photo from '../assets/react.svg'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {
    const [loding, setloding] = useState(false)
    const { login, user } = customhook()
    const [code, setcode] = useState("")
    const [data, setdata] = useState()
    const copyref = useRef(null)

    const generatecode = async () => {
        const res = await axios.post("https://referral-system-backend-theta.vercel.app/user/generate", { username: user })
        console.log(res);
        setcode(res.data.data.referralcode)
    }

    const getdata = async () => {
        if (login) {
            const res = await axios.post("https://referral-system-backend-theta.vercel.app/user/getdata", { username: user })
            console.log(res);
            setdata(res.data.data.data)
        }
    }

    const copycode = () => {
        const cref = copyref.current;
        if (cref) {
            cref.select();
            document.execCommand('copy')
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>
            {login ?
                <div className=' flex flex-col justify-center items-center px-5 sm:px-0'>
                    <h1 className=' text-center text-3xl font-bold m-5'>Referral system</h1>

                    <div className=' w-[100%] sm:w-[60%] flex flex-col justify-center items-center p-5 rounded-lg bg-gray-100'>
                        <h1 className=' font-bold text-xl p-[6px] '>Generate referral code</h1>
                        <button className=' bg-blue-700 text-white px-4 py-1 rounded-md font-bold cursor-pointer' onClick={generatecode}>generate</button>
                        {code.length == 0 ? "" : <section className=" flex items-center flex-col sm:flex-row">
                            <section className=' m-4 bg-white rounded-md px-3 py-[6px] flex w-[100%]'>
                                <input type='text' ref={copyref} defaultValue={code} className='w-[100%] focus:outline-none' />
                            </section>
                            <button className=' bg-blue-700 text-white font-semibold h-8 px-2 rounded-xl' onClick={copycode}>copy</button>
                        </section>}

                    </div>
                    <div className='flex border-2 w-60 p-4 my-10 rounded-lg bg-gray-100'>
                        <section className=' w-[50%]'>
                            <img src={photo} alt="" className=' w-[100%] h-[100%]' />
                        </section>
                        <section className=' w-[50%] flex flex-col justify-center items-start m-1'>
                            <h1 className=' text-xl font-bold text-blue-700'>Points</h1>
                            <h1 className=' font-bold text-lg text-blue-700 '>{data?.points}</h1>
                        </section>

                    </div>
                </div>
                : <div className=' w-[100%] h-screen text-center font-semibold py-10'> <h1>Login/Signup to see data</h1></div>}

        </div>
    )
}

export default Home