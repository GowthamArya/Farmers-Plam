import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Shop from './Shop';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../store/reducxStore';

const VeiwProduct = () => {
    const dispatch = useDispatch();
    const [Product, setProduct] = useState(null);
    const [isAdded,setIsAdded] = useState(false);
    const {id} = useParams();
    const data = (useSelector(store=>store.cartQuantity));
    useEffect(()=>{
        (data[id])
        ? 
        setIsAdded(true)
        :
        setIsAdded(false);
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/api/v1/product/product/${id}`);
            const json = await response.json();
            if(json.success){
                setProduct(json.productDetails);
            }
        }
        fetchData()
    },[id,isAdded]);
  return (
    <div className='w-full min-h-[70vh]'>
    {Product ? 
        <div className='w-full flex flex-col md:flex-row transition-all duration-500'>
                <img className='object-center object-cover w-full md:w-1/2 overflow-hidden h-[40vh] md:h-[60vh] lg:pl-40' src={Product.image} alt='' />
            <div className='w-full px-5 pb-4 md:w-1/2 border-b-[1px] md:border-none border-[#695d28da] h-auto text-[#fad636da] my-auto flex flex-col'>
                <h1 className='text-3xl font-bold mb-auto py-2 m-4  pl-5'>{Product.name}</h1>
                <h1 className='text-xl font-light m-4 mt-auto pl-5'>{Product.description}</h1>
                <div className='text-2xl font-bold m-4 pl-6'>Offer price - ₹{Product.sellPrice}
                    <div className='text-lg ml-5 font-medium line-through text-[#6f5e10da] mx-auto md:mr-auto'>MRR - ₹ {Product.mrp}</div>
                </div>
                {!isAdded?
                <button 
                className='bg-[#fad636da] w-3/4 px-3.5 p-1 rounded-lg text-black font-bold ml-10 mr-auto md:mr-auto'
                onClick={()=> {
                    dispatch(increment(Product._id));
                    setIsAdded(true)
                    }
                }
                >Add to Cart
                </button>
                :
                <Link 
                to="/cart"
                className='bg-[#fad636da] w-fit mr-auto px-5 p-1 rounded-lg text-black font-bold active:bg-black ml-10 active:text-[#fad636da]'
                >Go to Cart</Link>
                }
            </div>
        </div>
        :
        <div className='w-full p-10 flex flex-col md:flex-row bg-slate-900'>
                <div className='object-center object-cover w-full md:w-1/2 overflow-hidden h-[40vh] rounded-xl  md:h-[60vh] lg:pl-40 bg-slate-700 flex justify-center'>
                    <h1 className='m-auto font-bold text-2xl text-yellow-200 ml-10'>Loading...</h1>
                </div>

            <div className='w-full px-5 pb-4 md:w-1/2 border-b-[1px] md:border-none border-[#695d28da] h-[40vh] md:h-[60vh] text-[#fad636da] my-auto flex flex-col'>
                <div className='w-full h-1/2 m-2 rounded-xl bg-slate-800 justify-center flex'>
                <h1 className='font-bold text-2xl text-yellow-200 m-auto'>Loading...</h1></div>
                <div className='w-full h-1/4 m-2 rounded-xl bg-slate-800'></div>
                <div className='w-full h-1/6 m-2 rounded-xl bg-slate-800'></div>
            </div>
        </div>
        }
        <Shop />
    </div>
  )
}

export default VeiwProduct;