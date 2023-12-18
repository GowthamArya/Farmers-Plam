import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment,decrement } from '../store/reducxStore';


const CartProduct = ({description,name,mrp,sellPrice,image,_id}) => {
    const dispatch = useDispatch();
    const  cartQuantity = useSelector(store=>store.cartQuantity[_id]);
    const [quantity,setquantity]=useState(0);
    useEffect(()=>{
        const Quantity = (JSON.parse(localStorage.getItem("cartQuantity")));
        if(quantity!==Quantity){
            setquantity(cartQuantity);
        }
    },[cartQuantity])
return (<>
    {(description && name && mrp && sellPrice && image && quantity!==0) &&
    <div className='relative w-full mx-1 flex rounded-2xl p-2 text-[#fad636da]'>
        <img
            className='w-1/2 h-[35vh] object-cover' src={image} alt={description}/>
        <div className='relative w-1/2 h-[35vh] bg-[#1c1c2e] pl-2 text-[#ffda34da]'>
        <Link to={"/shop/"+_id}>
            <h1 className='text-2xl font-bold'>{name}</h1>
            <h1 className='w-full h-2/5 overflow-hidden'>{description}</h1>
            <div className='text-xl font-bold'>₹{sellPrice}.00 
            <div className='text-lg font-semibold line-through text-[#816d15da]'> ₹{mrp}.00</div></div>
        </Link>
            <div className='absolute bottom-1 right-1 w-1/3 h-1/6 bg-slate-800 rounded-md flex overflow-hidden hover:scale-95  transition-all duration-1000'>
                <button 
                onClick={()=>dispatch(decrement(_id))}
                className='w-1/3 text-2xl font-extrabold h-full p-[1px] m-auto hover:bg-black transition-all duration-500 hover:scale-110 active:bg-transparent'>-</button>
                <div className='w-1/3 text-2xl font-extrabold p-[1px] flex my-auto align-middle justify-center'>
                    {quantity || 1}
                </div>
                <button 
                onClick={()=>dispatch(increment(_id))}
                className='w-1/3 text-2xl font-extrabold h-full p-[1px] m-auto hover:bg-black transition-all duration-500 hover:scale-110 active:bg-transparent'>+</button>
            </div>
        </div>
    </div>}</>
  )
}

export default CartProduct;