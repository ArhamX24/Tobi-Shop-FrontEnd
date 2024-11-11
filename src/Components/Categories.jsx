import React from 'react'

const Categories = ({img , title}) => {
  return (
    <div className='flex-row items-center  text-screenColor justify-center m-6 lg:m-6 w-52 cursor-pointer transition-all duration-1000 ease-out hover:scale-105'>
        <div className='w-full bg-center bg-contain h-48 rounded-full flex-row items-center overflow-hidden justify-center bg-slate-400'>
            <img src={img} alt="" className='bg-center overflow-hidden h-full w-full'/>
        </div>
     <p className='text-center text-xl'>{title}</p>
    </div>
  )
}

export default Categories
