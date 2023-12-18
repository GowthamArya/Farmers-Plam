import React, { useEffect } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const OrderSuccess = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate("/");
        },5000)
        return ()=>{
            clearTimeout(timer);
        }
    })
  return (
    <div className='bg-green-600 h-screen overflow-hidden flex justify-center flex-col'>
        <FaCheckCircle className='font-extrabold text-9xl flex mx-auto  animate-ping transition-all duration-[3000]'/>
        <span className='mx-auto text-black font-bold mt-56 animate-pulse'>Order placed Successfully...</span>
        <span className='mx-auto text-black font-bold'>Redirecting to Home page...</span>
    </div>
  )
}

export default OrderSuccess;