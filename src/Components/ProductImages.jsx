import React from 'react'

const ProductImages = ({img, setIdx}) => {
  return (
    <div>
      {
        img?.map((item,idx)=>{
            return(
            <div key={idx} onClick={()=>{setIdx(idx)}} className="w-1/5 lg:w-1/4 border-y-2 hover:border-slate-500 cursor-pointer transition-all ease-in-out duration-700">
              <img src={item} alt="product image" className="lg:w-56 w-10 mb-1"/>
            </div>
            )
        })
      }
    </div>
  )
}

export default ProductImages
