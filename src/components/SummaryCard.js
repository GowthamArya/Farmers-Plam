import React, { useEffect } from 'react'

const SummaryCard = ({name,sellPrice,quantity,mrp}) => {
    useEffect(() =>{

    },[name,sellPrice,quantity,mrp]);
  return (
    <div className='text-[2vh] font-thin w-[80vw] md:w-2/3 bg-slate-900 mx-auto flex text-[#fad636da] border-b-2 border-[#fad636da] p-2'>
        <h1 className='w-3/6 overflow-hidden py-2 pl-1 m-auto'>{name}</h1>
        <h1 className='w-1/6 overflow-hidden py-2 m-auto'>₹ {sellPrice}.00</h1>
        <h1 className='w-1/6 overflow-hidden py-2 m-auto'>{quantity}</h1>
        <h1 className='w-1/6 overflow-hidden py-2 m-auto'>₹ {mrp}.00</h1>
    </div>
  )
}

export default SummaryCard