import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Body = () => {
  return (
    <div className='relative w-full overflow-hidden'>
        <Header/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body;