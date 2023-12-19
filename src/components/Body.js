import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
const Body = () => {
  useEffect(()=>{
      (
        async ()=>{
          const LocomotiveScroll = (await import("locomotive-scroll")).default;
          const locomotiveScroll = new LocomotiveScroll();
        }
      )()
  },[])
  return (
    <div className='relative w-full overflow-hidden'>
        <Header/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body;