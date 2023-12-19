import React, { useEffect, useState } from 'react'
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cartQuantity"));
  const [productList, setProductList] = useState({});
  useEffect(()=>{
    const fetchProduct = async ()=>{
      try {
        const data = Object.keys(cart).map(async id=>{
          if(cart[id] !== 0){
            const response = await fetch(`https://farmerspalm.onrender.com/api/v1/product/product/${id}`);
            const productData = await response.json();
            return {[id]:productData.productDetails};
          }
        });
        const result = await Promise.all(data)
        const mergedData = Object.assign({},...result);
        setProductList(mergedData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  },[]);
  const isCartEmpty=Object.values(useSelector(store=>store.cartQuantity)).every(cartItem=>cartItem===0);
  return (
    <div className='w-full min-h-screen justify-center'>
        <div className='w-[95%] md:w-[70%] flex flex-col mx-auto'>
            <h1 className='text-2xl text-[#fad636da] mx-auto py-8 font-extrabold'>Your Shopping Bag</h1>
            {Object.keys(productList)
            .map((eachProduct,i)=>
            <CartProduct className="transition-all duration-500" key={i} {...productList[eachProduct]}/>
            )}
        </div>
        {isCartEmpty ? 
          <div className='w-full flex flex-col'>
              <h1 className='text-2xl text-[#fad636da] mt-[15vh] mx-auto py-8 font-semibold'>Your Cart is Empty</h1>
              <h1 className='text-2xl text-[#fad636da] mx-auto py-8 font-semibold'>Start Adding to Your Cart</h1>
              <Link className='text-2xl rounded-lg bg-[#fad636da] text-black mx-auto p-3 font-semibold' to="/shop">Go to Shop</Link>
          </div>
        :
        <div className='w-full'>
              <Link className='text-2xl active:bg-slate-900 mt-4 w-[95%] md:w-[70%] rounded-sm bg-[#fad636da] text-black mx-auto p-2 font-bold flex active:text-[#fad636da] overflow-hidden transition-all duration-500' 
              to="cartSummary">
              <h1 className='m-auto'>Go to Summary</h1>
              </Link>
        </div>
        }
    </div>
  )
}

export default Cart;
