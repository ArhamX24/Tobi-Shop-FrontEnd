import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { quantityDec, quantityInc, removeItem } from '../Store/CartSlice'
import { Link } from 'react-router-dom'

const Cartitems = ({cartObj}) => {

    let dispatch = useDispatch()
  
      let {quantity , data } = cartObj
  
      let {thumbnail , title, price, id } = data
  
      let navigate = useNavigate();
  
      const handleNavigation = () => {
        navigate(`/product/${id}`)
      }
  
    return (
      <>
          <tr className=''>
          <th>
          </th>
          <td>
            <div className="flex items-center  gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <Link onClick={handleNavigation}><img
                    src={thumbnail}
                    alt="Avatar Tailwind CSS Component" /></Link>
                </div>
              </div>
            </div>
          </td>
          <td className='overflow-ellipsis text-sm'>
           {title}
          </td>
          <td>$ {quantity > 1 ? Math.trunc(price * quantity ): price }</td>
          <td><span className='mx-1 cursor-pointer' onClick={()=> dispatch(quantityInc(id))}>➕</span>{quantity}<span className='mx-1 cursor-pointer' onClick={()=> dispatch(quantityDec(id))}>➖</span></td>
          <button onClick={()=> dispatch(removeItem(id))} className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-error mt-8 md:mt-3">Remove</button>
        </tr>
        </>
    )
  }

export default Cartitems
