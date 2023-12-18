import scrollTotop from "../helper/scrollTotop"

const Product = ({_id,image,description,name,mrp,sellPrice}) => {
    
  return (
        <div className='text-white flex flex-wrap justify-start m-[1px] hover:scale-[.98] active:scale-100 p-[1px] transition-all duration-500'
        onClick={scrollTotop}
        >
            <div className='md:w-[24vw] w-[47vw] overflow-hidden h-[45vh] md:h-[38vh] p-2 rounded-sm bg-[#212135]'>
                <img className='object-cover object-center h-[50%] w-full bg-black rounded-t-sm overflow-hidden hover:scale-105  transition-all duration-1000' src={image} alt=''/>
                <div className='w-full h-[50%]'>
                    <h1 className='text-[2vh] font-bold text-[#fad636da]'>{name}</h1>
                    <p className='max-h-[38%] md:max-h-[43%] text-[1.5vh] w-full overflow-hidden'>{description}</p>
                    <p className="text-[1.5vh]">
                    {[...Array(Math.floor(Math.random()*6))].map(start=>
                    "⭐"
                    )}
                    </p>
                    <div className='text-[#fad636ba] flex text-[2vh] font-bold'>₹ {sellPrice}.00 
                    <div className="text-[#93802c] mt-auto flex text-[1.6vh] font-medium line-through ml-1">₹{mrp}.00</div></div>
                </div>
            </div>
        </div>
  )
}

export default Product