import React,{useState,useEffect,useContext} from 'react'
import { themeContext } from '../Components/ThemeStore'
import Card from '../Components/Card'
import ProductsShimmer from '../Components/ProductsShimmer';
import { Link
 } from 'react-router-dom';

 
const WomenPage = () => {
  const {Theme} = useContext(themeContext);
  const [women,setWomen] = useState(null);
  const [allWomen, setAllWomen] = useState(null);

  const [suggestion, setSuggestion] = useState(null)

  let timer = null;

  let apiCallFunction = function(apiCall, delay){
    clearTimeout(timer);
    timer = setTimeout(apiCall, delay)
  }

  const handleChange = async (event) => {
    let apiRes = await fetch(`https://dummyjson.com/products/search?q=${event.target.value}`);
    let data = await apiRes.json();
    setSuggestion(data?.products || []);
    
  }

  const getData = async () => {
    const data = [];

    const bagsRes = await fetch('https://dummyjson.com/products/category/womens-bags');
    const bagsData = await bagsRes.json();
    data.push(...bagsData.products);

    const dressRes = await fetch('https://dummyjson.com/products/category/womens-dresses');
    const dressData = await dressRes.json();
    data.push(...dressData.products);

    const jewelryRes = await fetch('https://dummyjson.com/products/category/womens-jewellery');
    const jewelryData = await jewelryRes.json();
    data.push(...jewelryData.products);

    const shoesRes = await fetch('https://dummyjson.com/products/category/womens-shoes');
    const shoesData = await shoesRes.json();
    data.push(...shoesData.products);

    const watchesRes = await fetch('https://dummyjson.com/products/category/womens-watches');
    const watchesData = await watchesRes.json();
    data.push(...watchesData.products);

    setWomen(data)
    setAllWomen(data)
  }

  const handleCategory = (category) => {
    let filteredData = allWomen.filter((product)=>{
      return product.category === category
    })
    setWomen(filteredData)
  }

  const clearSearch = ()=>{
    setSuggestion(null)

  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
   <div className='relative'>
        <label className={Theme == "light" ? "input input-bordered  border-black  border-2 flex items-center gap-2 lg:hidden w-11/12 my-4 mx-auto bg-transparent" : "input input-bordered  border-white border-2 flex items-center gap-2 lg:hidden w-11/12 my-4 mx-auto bg-transparent"}>
        <input onChange={(event)=>{apiCallFunction(()=>{handleChange(event), 300})}} type="text" className={Theme == 'light' ? "grow placeholder:text-black input-bordered border-black text-black" : "grow placeholder:text-black input-bordered border-slate-100 text-white"} placeholder="Search"/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className={Theme == 'light' ? "h-4 w-4 opacity-70 cursor-pointer text-black hover:bg-slate-600" : "h-4 w-4 opacity-70 cursor-pointer text-white hover:bg-slate-600"}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      {
              <div className={suggestion == null ? "hidden" : "flex-col max-h-60 overflow-auto absolute top-16 w-11/12 left-4 md:left-8 z-10 rounded-lg bg-slate-100 block lg:hidden"}>
          {
            suggestion?.map((item)=>{
              return(
                    <Link to={`/product/${item.id}`} onClick={clearSearch}>
                    <div className="flex items-center justify-between w-full px-2 border overflow-auto bg-inherit hover:bg-slate-200 transition-all ease-in-out duration-700 cursor-pointer">
                      <img width={50} src={item.thumbnail} alt="" />
                      <p className="text-ellipsis ">{item.title}</p>
                    </div>
                    </Link>
                  )
                })
              }
              </div>
          }
    <div className='w-full flex-row lg:flex  min-h-screen'>
      <div className='w-full h-1/2 lg:w-1/6 lg:h-screen border-r-4'>
      <h2 className='text-center lg:mt-8 text-3xl'>Browse By</h2>
      <div className='border-t-2 border-slate-500 mt-2 w-4/5 mx-auto'></div>
      <div className='w-full flex flex-wrap items-center justify-center p-5 lg:p-1 lg:flex-col'>
            <p onClick={()=>{handleCategory("womens-bags")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Bags</p>
            <p onClick={()=>{handleCategory("womens-dresses")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Dress</p>
            <p onClick={()=>{handleCategory("womens-jewellery")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Jewelry</p>
            <p onClick={()=>{handleCategory("womens-shoes")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Shoes</p>
            <p onClick={()=>{handleCategory("womens-watches")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Watches</p>
        </div>
      </div>
      <div className='w-full lg-w-5/6'>
        <h2 className='text-center lg:mt-8 text-3xl'>Women Wear</h2>
        <div className='border-t-2 border-slate-500 mt-2 w-4/5 mx-auto'></div>
        <p className='text-center '>{women?.length} Products</p>
        <div className=' flex flex-wrap items-center justify-around'>
        {
            women == null ? <ProductsShimmer></ProductsShimmer> : 
            women?.map((product, index) => {
                return (
                  <Link key={product?.id} to={`/product/${product.id}`}><Card  data={product}></Card></Link>
                )
            })
        }
        </div>
      </div>
    </div>
    </div>
  )
}

export default WomenPage
