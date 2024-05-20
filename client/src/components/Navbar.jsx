import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const navigate= useNavigate()
    const handleLogout= ()=> {
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className=' flex items-center bg-blue-700 h-16'>
        <div className=' flex justify-between mx-14 w-[100vw]'>
        <div className=' font-medium text-white text-[1.4rem]'>Welcome</div>
        <button onClick={handleLogout} className=' py-2 px-3 bg-red-600 hover:bg-green-600 rounded-lg text-sm text-white'>Logout</button>
        </div>
    </div>
  )
}

export default Navbar