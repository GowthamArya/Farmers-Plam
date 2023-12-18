import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [products,setProducts]=useState([]);
  const userId =JSON.parse(Cookies.get('userInfo')).accountIdOnAuth;
  useEffect(()=>{
    const fetchData = async (userId)=>{
            try{
              const response = await fetch(`http://localhost:4000/api/v1/order/myorders/${userId}`);
              const myOrders = await response.json();
              myOrders.productIds.map(async id=>{
                if(id){
                  const response = await fetch(`http://localhost:4000/api/v1/product/product/${id}`);
                  const data = response.json();
                  setProducts(data.productDetails);
                }
              })
            }catch(err){
              console.log(err);
            }
    }
    if(userId!==undefined){
      fetchData(userId)
    }

  },[userId])
  return (

          <div className='relative w-full mx-1 flex rounded-2xl p-2 text-[#fad636da]'>
          {products.length ? products.map((each,i)=> {
            const {image,description,name,sellPrice,_id,mrp} = each;
            if(image && description && name && sellPrice && _id){
              return <><img
                      className='w-1/2 h-[35vh] object-cover' src={image} alt={description}/>
                  <div className='relative w-1/2 h-[35vh] bg-[#1c1c2e] pl-2 text-[#ffda34da]'>
                  <Link to={"/shop/"+_id}>
                      <h1 className='text-2xl font-bold'>{name}</h1>
                      <h1 className='w-full h-2/5 overflow-hidden'>{description}</h1>
                      <div className='text-xl font-bold'>₹{sellPrice}.00 
                      <div className='text-lg font-semibold line-through text-[#816d15da]'> ₹{mrp}.00</div></div>
                  </Link>
                      <div className='absolute bottom-1 right-1 w-1/3 h-1/6 bg-slate-800 rounded-md flex overflow-hidden hover:scale-95  transition-all duration-1000'>
                      </div>
                  </div>
              </>}return null;
            }
            )
          :
          <div className='w-full h-[70vh] p-1 flex justify-center flex-col'>
            <h1 className='mx-auto mt-auto text-3xl text-yellow-500 font-semibold transition-all animate-pulse scale-105'>No orders Found!!!</h1>
            <h1 className='mx-auto mb-auto text-3xl text-yellow-500 font-semibold transition-all animate-pulse scale-105'>Start Ordering...</h1>
          </div>}
    </div>
  )
}

export default MyOrders;