import React from 'react'
import { Link } from 'react-router-dom'
import customhook from './Context'

function Navbar() {
    const { login, user, setlogin, setuser } = customhook()

    const logout = () => {
        localStorage.clear()
        setlogin(false)
        setuser("")

    }

    return (
        <div className=' flex items-center justify-between p-3 bg-gray-100'>
            <h1 className=' text-blue-700 font-bold'>Referral</h1>
            {login ? <section className=' flex justify-center items-center'>
                <h1 className=' font-semibold text-blue-700'>{user}</h1>
                <h1 className=' mx-1 font-bold text-white border-2 border-blue-700 bg-blue-700 rounded-3xl px-4 py-[2px] hover:text-blue-700 hover:bg-white hover:border-gray-200 cursor-pointer' onClick={logout}>Logout</h1>
            </section> :
                <section className=' flex'>
                    <h1 className=' mx-1 font-bold text-white border-2 border-blue-700 bg-blue-700 rounded-3xl px-4 py-[2px] hover:text-blue-700 hover:bg-white hover:border-gray-200 cursor-pointer'><Link to="/login">Login</Link></h1>
                    <h1 className=' mx-1 font-bold text-white bg-blue-700 rounded-3xl px-4 py-[2px] hover:text-blue-700 hover:bg-white hover:border-gray-200 cursor-pointer'><Link to="/signup">Signup</Link></h1>
                </section>
            }

        </div>
    )
}

export default Navbar