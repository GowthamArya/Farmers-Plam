import { useState } from 'react';
import sendOtp from '../helper/sendOtp';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Auth from './Auth';

const Agent = () => {
    const [imageFile,setImageFile]=useState();
    const [submitAfter,setSubmitAfter] = useState({message:"",submitClicked:false});
    const [submitAfter2,setSubmitAfter2] = useState({message:"",submitClicked:false});
    const [URL,setURL] = useState();
    const navigate = useNavigate()
    
    const uploadImage = async () => {
        const data = new FormData();
        data.append("file",imageFile);
        data.append("upload_preset",process.env.REACT_APP_UPLOADPRESENT);
        data.append("cloud_name",process.env.REACT_APP_CLOUDNAME);
        const res = await fetch(process.env.REACT_APP_CLOUDINARY,{
            method: "POST",
            body: data,
            mode:"cors"
        })
        const resData = await res.json();
        if(resData.url){
            setSubmitAfter({submitClicked:false,message:"Image Uploaded Successfully"})
            setProductData({...productData,image:resData.url})
            setURL(resData.url);
        }else{
            setSubmitAfter({submitClicked:false,message:resData.error.message});
        }
    }
    const {accountIdOnAuth,email} = JSON.parse(Cookies.get("userInfo"));
    const [productData,setProductData] = useState({
        email:email,
        agentId:accountIdOnAuth,
        pincodes:[]
    });
    const [pincode, setpincode] = useState('');
    const createProduct = async () => {
        try{
            const response = await fetch('http://localhost:4000/api/v1/product/create',{
                method: 'POST',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            const res = await response.json();
            if(res.success){
                setSubmitAfter2({message:res.message,submitClicked:false});
                navigate("/");
            }else {
                setSubmitAfter2({message:res.message+"Please try with png type...",submitClicked:false});
            }
        }catch(err){
            setSubmitAfter2({message:err.message,submitClicked:false});
            console.error(err);
        }
        }
  return (<>
    {Cookies.get("userInfo")&&JSON.parse(Cookies.get("userInfo")).accountTypeOnAuth==="agent"?
    <div className='w-full flex flex-col'>
        <div className='w-[80%] min-h-[65vh]  flex flex-col mx-auto my-10'>
        <h1 className='mx-auto py-3 font-extrabold text-xl text-[#fad636da]'>Create A New Product.</h1>
        {URL&&<img className=' m-2 w-[80%] max-h-[30vh] object-cover object-center rounded-md bg-zinc-950 border-[1px] border-[#fad636da] mx-auto' src={URL} alt='' />}
        
        <input className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" placeholder="Product Name" onChange={(e)=>{
            setProductData({...productData,name:e.target.value});
        }} type="text"></input>
        
        <input className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" placeholder="Description" onChange={(e)=>{
            setProductData({...productData,description:e.target.value});
        }}  type="text"></input>
        
        <input 
        onChange={(e)=>{
            setProductData({...productData,sellPrice:e.target.value});
        }}  
        className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
        placeholder="Sell price" 
        type="number"></input>
        
        <input 
        onChange={(e)=>{
            setProductData({...productData,mrp:e.target.value});
        }}  
        className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" placeholder="MRP" type="number"></input>
        {productData.pincodes.length>0  && 
        <div className='mt-2 w-[80%] flex flex-wrap py-1 px-3 rounded-md font-bold text-xl mx-auto min-h-10 bg-zinc-950 border-[1px] border-[#fad636da]'>
            {productData.pincodes.map((pin,index)=>{
                return <h1 key={index} className='text-black m-1 text-sm py-0 p-2 bg-[#fad636da] rounded-xl' onClick={()=>{
                    const pincodes = [...productData.pincodes];
                    pincodes.splice(pincodes.indexOf(pin),1)
                    setProductData({...productData,pincodes:[...pincodes]})}}>{pin}
                    </h1>
            })}
        </div>}
        <div className="relative w-full flex overflow-hidden">
            <input className="w-[65%] mt-2 mr-1 ml-auto py-2 px-2 rounded-md font-bold text-xl bg-zinc-950 border-[1px] border-[#fad636da] text-[#fad636da]" placeholder="Available Pincode" type="number" 
            onChange={(e)=>setpincode(e.target.value)}
            value={pincode}
            ></input>
            {(pincode.length === 6 && !productData.pincodes.includes(pincode))? 
            <button 
            className="w-[15%] mt-2 rounded-md font-bold text-sm bg-[#fad636da] active:text-black active:scale-[.98] active:bg-[#fad636da] border-[1px] border-[#fad636da] transition-all duration-400 ease-linear text-zinc-950 mr-auto hover:bg-black" 
            onClick={()=>{
                setProductData({...productData,pincodes:[...productData.pincodes,pincode]});
                setpincode("");
            }}>
                Add
            </button>:
            <button 
            className="w-[15%] mt-2 rounded-md font-bold text-sm  border-[1px] text-zinc-100 mr-auto bg-zinc-950 border-[#fad636da]">
                Add
            </button>}
            </div>
        <div className='text-[#fad636da] mt-2 w-[80%] rounded-md font-bold text-xl mx-auto bg-zinc-950 border-[1px] border-[#fad636da]'>
            <input 
            onChange={(e)=>{
                setImageFile(e.target.files[0]);
                uploadImage();
                setSubmitAfter({...submitAfter,submitClicked:true});
            }}
            type="file" 
            className='rounded-md text-[#fad636da] bg-zinc-950 w-full' 
            accept="image/png, image/jpeg" 
            />
        </div>
        <div className="w-[80%] mx-auto flex justify-center py-2 text-[#968228]">
            {submitAfter.submitClicked ? <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...
            </span>
        </div>: <h1>{submitAfter.message}</h1>}</div>
        <h1 className='mx-auto font-thin text-sm text-[#ff12128a]'>
            --- Check All before Submiting.---
        </h1>
        <div className='w-[80%] flex mx-auto'>
            <button 
            onClick={()=> sendOtp(productData.email)}
            className="w-[50%] m-2 ml-auto py-2 px-2 rounded-md font-bold text-xl bg-zinc-950 border-[1px] border-[#fad636da] text-[#fad636da] hover:bg-black  active:text-black active:scale-[.98] active:bg-[#fad636da] transition-all duration-400 ease-linear" >Send OTP</button>

            <input 
            onChange={(e)=> setProductData({...productData,otp:e.target.value})}
            value={productData.otp}
            className="w-[50%] m-2 mr-auto py-2 px-2 rounded-md font-bold text-xl bg-zinc-950 border-[1px] border-[#fad636da] text-[#fad636da]" 
            placeholder="OTP"
            minLength="4"
            maxLength="4"
            type="password"></input>
        </div>
        <div className="w-[80%] mx-auto flex justify-center py-2 text-[#968228]">
            {submitAfter2.submitClicked ? <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...
            </span>
        </div>: <h1>{submitAfter2.message}</h1>}</div>
        {!productData.agentId || !productData.description || !productData.email || !productData.image || !productData.mrp || !productData.name || !productData.otp || !productData.sellPrice ?
        <></>
        :
        <button 
        onClick={()=>{
            setSubmitAfter2({...submitAfter2,submitClicked: true})
            createProduct();
            }}
        className="w-[80%] my-5 p-2 font-bold rounded-md text-black text-xl mx-auto mb-3 bg-[#fad636da] hover:bg-black hover:text-[#fad636da] active:text-black active:scale-[.98] active:bg-[#fad636da] border-[1px] border-[#fad636da] transition-all duration-400 ease-linear" type="button">Add Product</button>
        }
        </div>
    </div>
    :
    <Auth loginFor="agent"/>
    }
  </>)
}

export default Agent