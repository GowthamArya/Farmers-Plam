import { useEffect, useState } from "react"
import Product from "./Product"
import { Link } from "react-router-dom";
import ProductShimmer from "../Shimmer.js/ProductShimmer";

const Shop = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        async function fetchdata(){
        const response = await fetch("http://localhost:4000/api/v1/product/products");
        const data = await response.json()
        setProducts(data.list);
    }
    fetchdata()
    },[])
  return (<>
    <h1 className='text-[#fad636da] w-fit mx-auto text-2xl py-5 font-bold'>
        SALE STARTED SHOP NOW !!!
    </h1>
    <div className='justify-start flex mx-auto min-h-[55vh] flex-wrap pl-1'>
        {!products.length 
        ?
        <ProductShimmer />
        :
        products.map((product,index) => <Link key={index} to={"/shop/"+product._id}><Product {...product} /></Link>)}
        
    </div>
    </>
  )
}

export default Shop