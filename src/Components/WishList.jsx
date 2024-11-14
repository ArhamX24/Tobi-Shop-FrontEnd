import { useContext,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { themeContext } from './ThemeStore'
import { removeItemWishlist, clearWishlist } from '../Store/WishListSlice.js'
import WishlistItems from './WishlistItems.jsx'

const WishList = () => {
  let wishlistData = useSelector((Store)=> Store?.wishlist?.items)

   const {Theme} = useContext(themeContext)
   
   let dispatch = useDispatch();

  return (
    <div className={Theme == 'light' ? 'bg-slate-100 text-black min-h-screen' : 'bg-slate-900 text-slate-100 min-h-screen'}>
      <div className="overflow-x-auto">
  <table className="table">
    <thead className={Theme == 'light' ? 'text-black p-3' : 'text-slate-100'}>
      <tr>
        <th>
        </th>
        <th>Product</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {
        wishlistData?.map((item)=> {
          return(
            <WishlistItems key={item.id} obj={item}></WishlistItems>
          )
        })
      }
    </tbody>
  </table>
  {
    wishlistData?.length == 0 ? '' :
    <>
    <div className='w-full flex justify-end p-5'>
    <button onClick={()=> dispatch(clearWishlist())} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-wide btn-error btn-outline mx-5">Clear Wishlist</button>
    </div>
    </>
  }
 
    </div>
    </div>
  )
}

export default WishList
