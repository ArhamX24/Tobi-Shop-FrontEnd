import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { themeContext } from './ThemeStore'
import { useContext } from 'react'
import { clearCart } from '../Store/CartSlice'

const CheckOutPage = () => {
   let cartData = useSelector((Store)=> Store.cart.items);
   let dispatch = useDispatch();

   let navigate = useNavigate()

   console.log(cartData);

   let totalAmount = 0
   
   const totalProductPrice = () => {
     cartData.forEach(item => {
        totalAmount += Math.trunc(item.data.price * item.quantity);
     });
   }

   totalProductPrice()

   const handleBuy = () => {
    alert("Order Placed Successfully");
    navigate('/')
    dispatch(clearCart())
   }
   
    
   const {Theme} = useContext(themeContext);


  return (
    <div className='w-full h-full flex justify-center min-h-screen'>
       <div className={Theme == 'light' ? 'w-full md:w-10/12 lg:w-2/3 h-1/2 bg-slate-100 text-black p-2 relative' : "bg-slate-700 text-white w-full md:w-10/12 lg:w-2/3 h-1/2 p-2 relative"}>
       {
        cartData.map((item)=> {
            return(
                <div key={item.data.id} className={Theme == 'light' ? 'w-full bg-slate-200 p-5 flex items-center justify-around mt-3 rounded-2xl': 'w-full bg-slate-600 p-5 flex items-center justify-around mt-3 rounded-2xl'}>
                    <img src={item.data.thumbnail} alt="" className='w-10' />
                    <div>{item.data.title}</div>
                    <div>{item.data.price * item.quantity} $</div>
                </div>
            )
        })
       }
       <div className='text-right mr-10 lg:mr-32 mt-3'>Total: {totalAmount}$</div>
       <div className='text-right mr-10 lg:mr-28 mt-3'>
       <button onClick={handleBuy} className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-success">Buy Now</button>
       </div>
       </div>
    </div>
  )
}

export default CheckOutPage
