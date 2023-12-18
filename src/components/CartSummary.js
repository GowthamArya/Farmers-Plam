import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SummaryCard from './SummaryCard';
import { Link, useNavigate } from 'react-router-dom';

const CartSummary = () => {
    const navigate = useNavigate();
    const cart = useSelector(store=>store.cartQuantity);
    const accountId = useSelector(store=>store.accountIdOnAuth);
    const [finalValues,setFinalValues] = useState({
        Quantity:0,
        TotalAmount: 0,
        savedAmount: 0,
    });
    const [address,setAddress] = useState({user:accountId});
    const [summary,setSummary] = useState([]);
    const [dataList,setDataList] = useState([]);
    useEffect(()=>{
        const fetchProduct = async ()=>{
          try {
            const promises=Object.keys(cart).map(async id=>{
                const response = await fetch(`http://localhost:4000/api/v1/product/product/${id}`);
                const data = await response.json();
                setFinalValues({
                            Quantity:finalValues.Quantity++,
                            TotalAmount: finalValues.TotalAmount+
                            data.productDetails.sellPrice,
                            savedAmount:finalValues.savedAmount+data.productDetails.mrp-data.productDetails.sellPrice
                        });
                return data;
            });
            const results = await Promise.all(promises);
            setDataList(results);
          } catch (err) {
            console.error(err);
          }
        }
        fetchProduct();
        dataList.map(each=>{
          setFinalValues({
              Quantity:finalValues.Quantity++,
              TotalAmount: finalValues.TotalAmount+each.productDetails.sellPrice,
              savedAmount:finalValues.savedAmount+each.productDetails.mrp-each.productDetails.sellPrice
          });
          setSummary([...summary,{
              name:each.productDetails.name,
              price:each.productDetails.sellPrice,
              quantity:cart[each.productDetails._id],
              value:each.productDetails.sellPrice*cart[each.productDetails._id],
          }])
          });
      },[]);
    async function orderSubmit(){
        try {
            const response = await fetch("http://localhost:4000/api/v1/address/create",{
                method:"post",
                headers:{ 'Content-Type': 'application/json' },
                body:JSON.stringify({...address}),
            })
            const data = await response.json();
            if(data.success){
                try{
                    const response = await fetch("http://localhost:4000/api/v1/order/create",{
                    method:"post",
                    headers:{ 'Content-Type': 'application/json' },
                    body:JSON.stringify({productIds:Object.keys(cart),userId:address.user,addressId:(data.address._id),pincode:address.pincode})});
                    const returnData = await response.json();
                    if(returnData.success){
                        navigate("/OrderSuccess");
                    }
                }catch(err){
                    console.log(err.message)
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
  return (
    
    <div className='w-full min-h-[66vh] flex flex-col justify-center'>
        <h1 className='py-2 my-0 mx-auto text-gray-600'>
            Don't refresh the page
        </h1>
        {
            dataList.map(each=>{
                return <SummaryCard {...each.productDetails} />
            })
        }
        <div className='text-[2vh] p-1 font-thin w-[80vw] md:w-2/3 bg-slate-900 mx-auto flex text-[#fad636da] border-b-2 border-[#fad636da]'>
            <h1 className='w-3/6 overflow-hidden py-2 flex m-auto'>Total Amount Saved - {finalValues.savedAmount}</h1>
            <h1 className='w-1/6 overflow-hidden py-2 flex m-auto'>Qty-{finalValues.Quantity}</h1>
            <h1 className='overflow-hidden py-2 mr-2'>₹ {finalValues.TotalAmount}.00</h1>
        </div>
        <address className='text-[2vh] p-6 font-thin w-full md:w-2/3 mx-auto flex flex-col text-[#fad636da]'>
            <h1 className='mx-auto font-extrabold text-xl'>Address</h1>
            <input 
            onChange={e=>setAddress({...address,house:e.target.value})}
            className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
            placeholder="House Number" 
            type="text">
            </input>
            <input 
            onChange={e=>setAddress({...address,street:e.target.value})}
            className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
            placeholder="Street" 
            type="text"></input>
            <input 
            onChange={e=>setAddress({...address,village:e.target.value})}
            className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
            placeholder="Town" 
            type="text"></input>
            <input 
            onChange={e=>setAddress({...address,contact:e.target.value})}
            className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
            placeholder="Contact Number" 
            type="text"></input>
            <input 
            onChange={e=>setAddress({...address,pincode:e.target.value})}
            className="text-[#fad636da] mt-2 w-[80%] py-2 px-3 rounded-md font-bold text-xl mx-auto h-10 bg-zinc-950 border-[1px] border-[#fad636da]" 
            placeholder="Pincode" 
            type="text"></input>
            {address.house&&address.street&&address.village&&address.contact&&address.pincode&&address.user?
                <Link 
                onClick={orderSubmit}
                className='text-xl active:bg-slate-900 mt-4 rounded-sm bg-[#fad636da] text-black mx-auto p-2 font-bold flex active:text-[#fad636da] overflow-hidden transition-all duration-500' 
                to="cartSummary">
                <h1 className='m-auto'>Continue toPay</h1>
                </Link>
            :
            !accountId&&<h1 className='mx-auto p-1 text-yellow-600'>Your not Logged in <Link to="/login" className='underline'>click here to Login</Link></h1>
            }
        </address>
    </div>
  )
}

export default CartSummary;