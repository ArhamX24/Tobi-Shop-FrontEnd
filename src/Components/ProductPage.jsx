import React,{useEffect, useState,useContext} from 'react'
import { themeContext } from '../Components/ThemeStore'
import { useParams, useNavigate } from 'react-router-dom'
import ProductImages from './ProductImages'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../Store/CartSlice'
import { addItemWishlist,removeItemWishlist } from '../Store/WishListSlice'

const ProductPage = () => {
    const {Theme} = useContext(themeContext)
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [idx, setIdx] = useState(0);
    const [openIdx,setOpenIdx] = useState(null)
    const [reviewIdx, setReviewIdx] = useState(null)
    const [inWishlist, setInWishlist] = useState(false)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let cartData = useSelector((Store)=> Store.cart.items);
    let wishlistData = useSelector((Store)=> Store.wishlist.items);

    let productInCart = () => {
      let idx = cartData.findIndex((item)=> item.data.id == id);

      if(idx == -1){
        return false
      }else{
        return true
      }
    }

    let productInWishlist = () => {
      let idx = wishlistData.findIndex((item)=> item.data.id == id);

      if(idx == -1){
        return false
      }else{
        return true
        setInWishlist(true)
      }
    }
    
    let handleGotoCart = () => {
      navigate('/cart')
    }
    

    const getData = async () => {
      let response = await fetch(`https://dummyjson.com/products/${id}`)
      let data = await response.json();

      setProduct(data);
    }

    const handleCart = () => {
      dispatch(addItem(product))
    }
    
    const handleWishlist = () => {
      dispatch(addItemWishlist(product));
      setInWishlist(true)
    }
    
    const removeFromWishlist = () => {
      dispatch(removeItemWishlist(id));
      setInWishlist(false)
    }
    

    const handleOpen = (index)=>{
        setOpenIdx(openIdx == index ? null : index)
    }

    const handleReviewIdx = (index)=>{
        setReviewIdx(reviewIdx == index ? null : index)
    }

    let {title, category, price, thumbnail, rating , reviews, brand, weight, returnPolicy, images, description, warrantyInformation} = product

    let descriptionArray = [
        {text: "Warranty Information", content: warrantyInformation},
        {text: "Return Policy", content: returnPolicy},
        {text: "Brand", content: brand || "NA"}
    ]
    
    useEffect(() => {
      getData()
    }, [])
  return (
    <>
    <div className='w-full flex justify-center items-start h-full lg:h-product-page relative'>
        <div className={Theme == 'light' ? 'w-full border-2 bg-slate-100 p-5 rounded-xl lg:w-4/5 bg-inherit flex-row lg:flex items-center mt-4' : "w-full border-2 bg-slate-700 p-5 rounded-xl lg:w-4/5 bg-inherit flex-row lg:flex items-center mt-4"}>
        <div className='hidden lg:block'>
            <ProductImages key={id} setIdx={setIdx} img={images}></ProductImages>
        </div>
        <div className='w-full md:w-1/2 mx-auto lg:mx-0 border-b-2 md:border-r-2 md:border-b-0'>
            <img src={images?.[idx]} alt="thumbnail" className='max-w-sm max-h-80' />
        </div>
        <div className='lg:hidden'>
            <ProductImages key={id} setIdx={setIdx} img={images}></ProductImages>
        </div>
        <div className='w-full h-full md:w-1/2 p-4 text-center lg:text-left'>
            {
                productInCart() == true ? <div className='bg-screenColor text-white w-48 flex items-center justify-center px-3 py-2 rounded-lg mb-4'>Added To Cart</div> : ""
            }
            <div className='w-full'>
            <div className='mb-10'>
                <h1 className='text-xl'>{title}</h1>
            </div>
            <div className='mb-10'>
                <p className='text-md'>{price}$</p>
            </div>
            <div className='flex items-center justify-around'>
                         {
                            productInWishlist() == true ?
                            <button onClick={removeFromWishlist}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                            </svg>
                            </button>
                            :
                            <button onClick={handleWishlist}>
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>
                            </button>

                        }
                {
                    productInCart() == false ?
                    <button onClick={handleCart} className={Theme == 'light'  ? "btn btn-primary lg:btn-wide bg-screenColor hover:bg-hoverColor transition-all ease-in-out duration-500 text-white" : "btn btn-outline lg:btn-wide  hover:bg-slate-700 hover:text-white transition-all ease-in-out duration-500 text-white"}>Add To Cart</button> :
                    <button onClick={handleGotoCart} className={Theme == 'light'  ? "btn btn-primary lg:btn-wide bg-screenColor hover:bg-hoverColor transition-all ease-in-out duration-500 text-white" : "btn btn-outline lg:btn-wide  hover:bg-slate-700 hover:text-white transition-all ease-in-out duration-500 text-white"}>Go To Cart</button>
                }

            </div>
            </div>
        </div>
        </div>
    </div>
    <div className={Theme == 'light' ? 'w-full lg:w-4/5 h-full mx-auto my-2 bg-slate-100 mt-2 p-3' : "p-3 mt-2 w-full lg:w-4/5 h-full mx-auto my-2 bg-slate-700"}>
        <h2 className='text-2xl text-center'>Product Description</h2>
        <div className='border-t-2 border-slate-500 mt-2 w-4/5 mx-auto'></div>
        <p className='text-center'>{description}</p>
        <div className='mt-4 w-full flex-col lg:flex items-center'>
            <div className='w-full md:w-1/2'>
            {
            descriptionArray?.map((item, index)=>{
                return(
                    <div key={index} onClick={()=> handleOpen(index)} className={Theme == 'light' ? 'flex-col items-center p-2 hover:bg-slate-200 cursor-pointer transition-all ease-out duration-1000' : 'flex-col items-center p-2 hover:bg-slate-800 cursor-pointer transition-all ease-out duration-1000'}>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xl'>{item.text}</h3>
                        <div className='cursor-pointer'>
                            {
                                openIdx == index ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 11V13H19V11H5Z"></path></svg>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            openIdx == index ? <p className='text-md'>{item.content}</p> : ""
                        }
                    </div>
                    <div className='border-t-2 border-slate-500 w-full mx-auto'></div>
                </div>
                )
            })
            }
            </div>
            <div className='w-full md:w-1/2'>
            <h3 className='text-center'>Comments & Reviews</h3>
            {
                reviews?.map((item, index)=>{
                    return(
                        <div key={index} onClick={()=> handleReviewIdx(index)} className={Theme == 'light' ? 'flex-col items-center p-2 hover:bg-slate-200 cursor-pointer transition-all ease-out duration-1000' : 'flex-col items-center p-2 hover:bg-slate-800 cursor-pointer transition-all ease-out duration-1000'}>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-md'>{item.reviewerName}</h3>
                        <div className='cursor-pointer'>
                            {
                                reviewIdx == index ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 11V13H19V11H5Z"></path></svg>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            reviewIdx == index ? 
                            <div  className='flex items-center justify-between w-1/2'>
                                <p className='text-sm'>{item.comment}</p>
                                <p className='text-sm'>{item.rating}⭐</p>
                            </div>
                            : ""
                        }
                    </div>
                    <div className='border-t-2 border-slate-500 w-full mx-auto'></div>
                </div>
                    )
                })
            }
            </div>
         
        </div>
    </div>
    </>
  )
}

export default ProductPage
