import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeItemWishlist } from '../Store/WishListSlice';
import { Link } from 'react-router-dom';

const WishlistItems = ({obj}) => {

    let {data} = obj

    let{thumbnail, title, id} = data
    
  let dispatch = useDispatch()
  let navigate = useNavigate();
    
  const handleNavigation = () => {
    navigate(`/product/${id}`)
  }
  return (
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
    <button onClick={()=> dispatch(removeItemWishlist(id))} className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-error mt-8 md:mt-3">Remove</button>
  </tr>
  )
}

export default WishlistItems
