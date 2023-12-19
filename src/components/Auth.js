import { useState } from "react";
import sendOtp from "../helper/sendOtp";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./Home";
import { useDispatch } from 'react-redux';
import { setLoginTrueWith } from '../store/reducxStore';
import logo from "../images/logo.png";


const Auth = ({loginFor})=>{
    const dispatch = useDispatch();
    const userData = {};
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [inLoginPage, setinLoginPage] = useState("login");
    const [otp,setOtp] = useState("");
    const [password, setpassword] = useState("");
    const [submitAfter,setSubmitAfter] = useState({message:"",submitClicked:false});
    const [ConfirmPassword, setConfirmPassword] = useState("");
    async function login (methodFor){
        fetch(`https://farmerspalm.onrender.com/api/v1/${loginFor}/${methodFor}`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                email:email,
                password:password,
                otp:otp
            })
        })
        .then(response =>response.json())
        .then(e=>{
            setSubmitAfter({submitClicked:false,message:e.message});
            if(e.success){
                Cookies.remove("userInfo");
                Cookies.set('userInfo',
                    JSON.stringify(
                        {accountIdOnAuth:e.id,
                        accountTypeOnAuth:loginFor,
                        email:email,
                        loggedIn:true,
                        cartItems:[]}
                ),{expires:7})
            }
        }).then(()=>{
            dispatch(setLoginTrueWith({...JSON.parse(Cookies.get('userInfo'))}));
        }).then(()=>{
            switch (loginFor) {
                    case "agent":
                        navigate("/agent");
                        break;
                    case "user":
                        navigate("/");
                        break;
                    case "dealer":
                        navigate("/dealer");
                        break;
                    default:navigate("/");
                        break;
                }
                navigate("/");
        })
        .catch(err=>console.log(err));
    }
    return (<>
    {!userData.loggedIn ? 
        <div className="h-[100vh] w-full flex justify-center align-middle">
            <div className="w-[75%] min-h-[75%] my-auto md:w-[40%] rounded-md border-[1px] flex flex-col justify-center border-[#fad636da]">
                <img className="w-1/4 mx-auto h-auto" src={logo} alt="Logo" />
                <h1 className="mx-auto p-4 font-bold text-2xl text-[#fad636da]">Farmer's Plam</h1>
                <div className="w-full h-[60%] flex flex-col justify-evenly ">
                    <div className="bg-zinc-950 rounded-2xl mx-auto font-semibold text-lg p-2 text-[#8d7716] flex justify-around gap-1">
                        <button className={inLoginPage==="login"  ? "bg-[#fad636da] text-zinc-950 w-full rounded-2xl px-1 font-bold" : ""} onClick={()=>{
                            setinLoginPage("login");
                            }}>Login</button>
                        <button className={inLoginPage==="signup" ? "bg-[#fad636da] text-zinc-950 w-full rounded-2xl px-1 font-bold" : ""}
                        onClick={()=>{
                            setinLoginPage("signup");
                        }}>SignUp</button>
                    </div>
                <h1 className="mx-auto p-1 font-bold text-sm text-[#fad6369b]">for {loginFor}</h1>
                <div className="relative w-full flex overflow-hidden">
                    <input 
                        className="w-[65%] mt-2 mr-[2px] ml-auto py-2 px-2 rounded-md font-bold text-xl bg-zinc-950 border-[1px] border-[#fad636da] text-[#fad636da]" 
                        placeholder="email" type="email" 
                        onChange={(e)=>{
                            setemail(e.target.value)}} 
                        value={email}
                        ></input>
                    <button 
                        className="w-[15%] mt-2 active:bg-[#000] active:text-[#fad636da] rounded-md font-bold text-sm bg-[#fad636da] border-[1px] text-zinc-950 mr-auto hover:bg-black hover:text-[#fad636da]" 
                        onClick={()=>sendOtp(email)}
                        >Send OTP</button>
                </div>
                    <input  
                    onChange={(e)=>setpassword(e.target.value)} value={password}  className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto bg-zinc-950 border-[1px] border-[#fad636da]" placeholder="password" type="password"></input>

                    {inLoginPage==="signup" && 
                    <input className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto bg-zinc-950 border-[1px] border-[#fad636da]" placeholder="Confirm password" type="password" 
                    value={ConfirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)}></input>}

                    {inLoginPage==="signup" && (ConfirmPassword !== password && <h1 className='text-red-700 text-sm mx-auto'>Password & ConfirmPassword must match</h1>)}
                    <input 
                    onChange={(e)=>setOtp(e.target.value)} 
                    value={otp} 
                    className="text-[#fad636da] w-1/4 py-1 px-2 rounded-md font-bold text-xl mx-auto bg-zinc-950 border-[1px] border-[#fad636da] m-2" 
                    placeholder="OTP" 
                    type="number"
                    maxLength={4}
                    ></input>
                    <div className="w-[80%] mx-auto flex justify-center py-2 text-[#968228]">
                    {submitAfter.submitClicked ? <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...
                        </span>
                    </div>: <h1>{submitAfter.message}</h1>}</div>
                    {(email && otp.length===4 && password)&&
                    <button 
                        className="w-[80%] p-2 rounded-md text-black font-bold text-xl mx-auto m-4 bg-[#fad636da] hover:bg-black hover:text-[#fad636da]" 
                        type="button"  
                        onClick={()=>{
                            setSubmitAfter({...submitAfter,submitClicked:true});
                            login(inLoginPage);
                        }}>
                        {inLoginPage.toUpperCase()}
                    </button>
                    }
                </div>
                
                <div className="w-[80%] flex justify-center mt-3 mx-auto">
                <h1 className="text-yellow-500">login for</h1>
                {loginFor!=="agent" && <Link to="/agent" className="ml-2 underline text-[#968228]">Agent</Link>}
                {loginFor!=="user" && <Link to="/user" className="ml-2 underline text-[#968228]"> User</Link>}
                {loginFor!=="dealer" && <Link to="/dealer" className="ml-2 underline text-[#968228]"> Dealer</Link>}
                </div>
            </div>
        </div> 
        :
        <Home />
        }
    </>)
}

export default Auth;
