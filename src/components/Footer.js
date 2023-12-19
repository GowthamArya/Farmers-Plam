import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <div className="min-h-[15vh] w-full mt-5 text-[#fad636da] border-t-[0.5px] border-[#7d6e2b] md:flex justify-around overflow-hidden">
    <Link 
    to="/"
    className='flex flex-col md:flex-row'>
      <img className="h-[8vh] md:h-[16vh] flex m-auto" src={logo} alt="Logo" />
      <h1 className="text-xl font-bold m-auto flex"> Farmer's Palm</h1>
    </Link>
    <div className='gap-[3vw] flex flex-col justify-center p-[3vw]'>
      <div className='flex justify-center gap-[3vw] text-sm font-bold'>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSe2kcQdNUjyPJU62oSWhxZod_xmrJ5vZJ19iKQvpozTueK9lg/viewform?usp=sf_link' target='blank'>
          <button className='mx-1'>Dealer</button>
          <button className='mx-1'>Sell</button>
          <button className='mx-1'>Enquiry</button>
        </a>
      </div>
      <h1 className='mx-auto text-[#fad63671]'>©️ All rights not Reserved</h1>
    </div>
    </div>
  )
}

export default Footer