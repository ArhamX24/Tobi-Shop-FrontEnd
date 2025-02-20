import React,{useEffect,useState,useContext} from 'react'
import { themeContext } from '../Components/ThemeStore'
import Card from '../Components/Card'
import ProductsShimmer from '../Components/ProductsShimmer'
import { Link } from 'react-router-dom'

const AllProductsPage = () => {
    const {Theme} = useContext(themeContext)
    const [products, setProducts] = useState(null)
    const [allProducts, setAllProducts] = useState(null)

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
        let response = await fetch('https://dummyjson.com/products?limit=196');
        let data = await response.json();
      setProducts(data.products)
      setAllProducts(data.products);

      console.log(data.products);
    }

    const handleCategories = (category) => {
        let filteredData = allProducts.filter((product => {
            return product.category === category
        }));

        setProducts(filteredData)
    }
    
    const handleTopRated = () => {
      let filteredData = allProducts.filter((product => {
        return product.rating > 4;
      }))

      setProducts(filteredData);
    }
    

    useEffect(() => {
      getData()
    }, []) 

    
    const clearSearch = ()=>{
      setSuggestion(null)

    }

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
      <div className='w-full h-1/2 lg:w-1/6 lg:min-h-screen border-r-4'>
      <h2 className='text-center lg:mt-8 text-3xl'>Browse By</h2>
      <div className='border-t-2 border-slate-500 mt-2 w-4/5 mx-auto'></div>
      <div className='w-full flex flex-wrap items-center justify-center p-5 lg:p-1 lg:flex-col'>
            <p onClick={handleTopRated} className='font-medium  cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Top Rated</p>
            <p onClick={()=>{handleCategories("beauty")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Beauty</p>
            <p onClick={()=>{handleCategories("fragrances")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Fragrances</p>
            <p onClick={()=>{handleCategories("furniture")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Furniture</p>
            <p onClick={()=>{handleCategories("laptops")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Laptops</p>
            <p onClick={()=>{handleCategories("smartphones")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Smart Phone</p>
            <p onClick={()=>{handleCategories("tablets")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Tablets</p>
            <p onClick={()=>{handleCategories("sunglasses")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Sun Glasses</p>
            <p onClick={()=>{handleCategories("mens-watches")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Watches</p>
            <p onClick={()=>{handleCategories("sports-accessories")}} className='font-light cursor-pointer transition-all ease-out duration-1000 hover:underline mr-4 lg:mt-4'>Sports</p>
        </div>
      </div>
      <div className='w-full lg-w-5/6'>
        <h2 className='text-center lg:mt-8 text-3xl'>All Products</h2>
        <div className='border-t-2 border-slate-500 mt-2 w-4/5 mx-auto'></div>
        <p className='text-center '>{products?.length} Products</p>
        <div className=' flex flex-wrap items-center justify-around'>
        {
            products == null ? <ProductsShimmer></ProductsShimmer> :
            products?.map((product, index) => {
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

export default AllProductsPage
