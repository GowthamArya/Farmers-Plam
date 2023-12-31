import { useEffect, useRef, useState } from 'react'
import { CgMenuRight } from 'react-icons/cg';
import { RiWifiOffLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { ImCart } from "react-icons/im";
import logo from "../images/logo.png";


import Cookies from 'js-cookie';

const Header = () => {
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const userData=({...JSON.parse(Cookies.get("userInfo"))});
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const closeMenuOut = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !menuIconRef.current.contains(e.target) ){
      setisMenuOpen(false);
    }
  }
  useEffect(()=>{
    document.addEventListener("mousedown",closeMenuOut);
    document.addEventListener("touchstart",closeMenuOut);
    return ()=>{
      document.removeEventListener("mousedown",closeMenuOut);
      document.removeEventListener("touchstart",closeMenuOut);
    }
  },[]);


  return (<>
        <div className="sticky top-0 z-50 backdrop-blur-lg w-full h-[10vh] text-[#fad636da] border-[#2d270fc0] bg-[#0000009c] border-b-2 flex justify-between">
                <Link to="/" className="flex">
                  <img className="h-[10vh] ml-10" src={logo} alt="Logo" />
                  <h1 className="md:text-[3vw] text-[5vw] font-bold mx-0 my-auto">
                    Farmer's Palm
                  </h1>
                </Link>
                <div className="flex justify-center mr-[2vw] my-auto" ref={menuIconRef}>
                    {!navigator.onLine && <RiWifiOffLine className="text-3xl"/>}
                    <Link 
                    to="/cart" className="text-2xl ml-1 my-auto px-1 active:text-black"
                    onClick={()=>setisMenuOpen(false)}>
                    <ImCart />
                    </Link>
                      <CgMenuRight 
                      className="text-3xl ml-2 active:scale-95" 
                      onClick={()=>setisMenuOpen(!isMenuOpen)}/>
                </div>
        </div>
        {isMenuOpen && 
        <div 
          className='fixed right-0 backdrop-blur-xl font-bold text-[3w] bg-[#debb20c0] cursor-pointer md:w-[20vw] w-[100vw] min-h-[10vh] pt-5 flex flex-col justify-center gap-7 z-50'
          ref={menuRef} 
          onClick={()=>{
          setisMenuOpen(!isMenuOpen)
          }}
          onMouseLeave={()=>
          setisMenuOpen(false)
          }
        >
        {
        !userData.accountTypeOnAuth 
        && 
        ["Login","cart"].map((menuOption,i) =>
            menuOption &&
            <Link key={i} to={"/"+menuOption}>
              <h1 className='text-black hover:font-extrabold p-2'>{menuOption}
              </h1><hr className='text-black border-black border-2'/>
            </Link>)
        }
        {
        userData.accountTypeOnAuth === "user" 
        && 
        ["Logout","cart"].map((menuOption,i) =>
            menuOption &&
            <Link key={i} to={"/"+menuOption}>
              <h1 className='text-black hover:font-extrabold p-2'>{menuOption}
              </h1><hr />
            </Link>)
        }
        {
        userData.accountTypeOnAuth === "agent" 
        && 
        ["Addproduct","Logout"].map((menuOption,i) =>
            menuOption &&
            <Link key={i} to={"/"+menuOption}>
              <h1 className='text-black hover:font-extrabold p-2'>{menuOption}
              </h1><hr />
            </Link>)
        }
        {
        userData.accountTypeOnAuth === "dealer" 
        &&
        ["contactUs","Logout"].map((menuOption,i) =>
            menuOption &&
            <Link key={i} to={"/"+menuOption}>
              <h1 className='text-black hover:font-extrabold p-2'>{menuOption}
              </h1><hr />
            </Link>)
        }
        
        <div className='flex w-full justify-center gap-2 pb-2 underline'>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSe2kcQdNUjyPJU62oSWhxZod_xmrJ5vZJ19iKQvpozTueK9lg/viewform?usp=sf_link' target='blank'>
        <button>Dealer</button>
        <button className='mx-1'>Sell</button>
        <button>Enquiry</button>
        </a>
        </div>
        </div>}
        
  </>)
}

export default Header