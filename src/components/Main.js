import React from 'react';
import homeMainPage from "../images/home.webp"
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="md:flex h-[90vh] overflow-hidden">
        <div className="w-full h-1/2 md:w-1/2 md:h-full flex-col flex justify-evenly">
            <h1 title="Farmers Palm app gowtham arya farmerspalmapp.onrender" className="text-[7vw] md:text-[4vw] px-10 text-[#fad636fc] font-extrabold mt-6">
                FRESH FROM FARM TO YOUR PLATE.
            </h1>
            <div className="font-sans text-[2vh] md:text-[2vw] px-10 text-yellow-100 font-bold">
                <h1 className="underline text-[#fad636da]">Restocked & Ready For You,</h1>
                One step solution for those who don't compromise on health & quality.
            </div>
            <Link to="/shop"><button className="bg-[#fad636da] p-2 font-extrabold md:text-[2vw] text-[3vh] rounded-md mx-9 my-2 text-black">Shop Now</button></Link>
        </div>
        <img className="w-full h-1/2 md:w-1/2 md:h-full object-cover" src={homeMainPage} alt="" />
    </div>
  )
}
 
export default Main
