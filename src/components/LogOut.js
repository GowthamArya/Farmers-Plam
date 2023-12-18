import React, { useEffect } from 'react'
import Main from './Main';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogOut = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    Cookies.remove("userInfo");
    const timeOut =  setTimeout(()=>{
    if(!Cookies.get('userInfo')){
      Cookies.set("userInfo",JSON.stringify({
        accountIdOnAuth:null,
        accountTypeOnAuth:null,
        loggedIn:false,}),{
        expires:7
      });
      // setData({...JSON.parse(Cookies.get('userInfo'))});
      }
      navigate("/login");
    }, 2000)
    return () =>{
      clearTimeout(timeOut);
    };
  })
  return (
    <div className='w-full'>
      <div className='bg-red-600 w-full flex'>
        <h1 className='mx-auto w-auto text-lg text-black font-bold'>Logged Out successfully- <Link to='/login' className='text-xl text-[#debb20]'>Goto Login Page</Link></h1>
      </div>
        <Main />
    </div>
  )
}

export default LogOut;