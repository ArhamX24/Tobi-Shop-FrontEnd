import React,{useEffect, useState,useContext} from 'react'
import { themeContext } from '../Components/ThemeStore'
import { useParams } from 'react-router-dom'
import ProductImages from './ProductImages'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../Store/CartSlice'

const ProductPage = () => {
    const {Theme} = useContext(themeContext)
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [idx, setIdx] = useState(0);
    const [openIdx,setOpenIdx] = useState(null)
    const [reviewIdx, setReviewIdx] = useState(null)
    let dispatch = useDispatch()

    const getData = async () => {
      let response = await fetch(`https://dummyjson.com/products/${id}`)
      let data = await response.json();

      setProduct(data);
    }

    const handleCart = () => {
      dispatch(addItem(product))
    }
    

    const handleOpen = (index)=>{
        setOpenIdx(openIdx == index ? null : index)
    }

    const handleReviewIdx = (index)=>{
        setReviewIdx(reviewIdx == index ? null : index)
    }
    
    console.log(product);

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
    <div className='w-full flex justify-center items-start h-full lg:h-product-page'>
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
            <div className='w-full'>
            <div className='mb-10'>
                <h1 className='text-xl'>{title}</h1>
            </div>
            <div className='mb-10'>
                <p className='text-md'>{price}$</p>
            </div>
            <div className='text-right'>
            <button onClick={handleCart} className={Theme == 'light'  ? "btn btn-primary lg:btn-wide bg-screenColor hover:bg-hoverColor transition-all ease-in-out duration-500 text-white" : "btn btn-outline lg:btn-wide  hover:bg-slate-700 hover:text-white transition-all ease-in-out duration-500 text-white"}>Add To Cart</button>
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
