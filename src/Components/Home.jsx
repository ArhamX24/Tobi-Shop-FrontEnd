import React,{useContext,useState,useEffect} from "react";
import { themeContext } from "./ThemeStore";
import cosmetics from "../Images/Categories/cosmetics.jpg"
import electronics from "../Images/Categories/electronics.jpg"
import groceries from "../Images/Categories/groceries.jpg"
import house from '../Images/Categories/house.jpg'
import laptop from "../Images/Categories/laptop.jpg"
import mens from '../Images/Categories/mens.jpg'
import mobile from "../Images/Categories/mobile.jpg"
import perfume from "../Images/Categories/perfume.jpg"
import women from "../Images/Categories/women.jpg"
import "../CustomCSS/home.css"
import Categories from "./Categories";
import { Link } from "react-router-dom";


const Home = () => {
  const {Theme} = useContext(themeContext)
  const [suggestion, setSuggestion] = useState(null)

  let timer = null;

  let apiCallFunction = function(apiCall, delay){
    clearTimeout(timer);
    timer = setTimeout(apiCall, delay);
  }

  const handleChange = async (event) => {
    let apiRes = await fetch(`https://dummyjson.com/products/search?q=${event.target.value}`);
    let data = await apiRes.json();
    setSuggestion(data?.products || []);
    
  }
  
  console.log(suggestion);

  
  const clearSearch = ()=>{
    setSuggestion(null)

  }

  return (
    <div className={Theme == 'light' ? "text-black relative" : "text-slate-50 relative"}>
      <label className={Theme == "light" ? "input input-bordered  border-black  border-2 flex items-center gap-2 lg:hidden w-11/12 my-4 mx-auto bg-transparent" : "input input-bordered  border-white border-2 flex items-center gap-2 lg:hidden w-11/12 my-4 mx-auto bg-transparent"}>
        <input onChange={(event)=> apiCallFunction(()=> handleChange(event), 400)} type="text" className={Theme == 'light' ? "grow placeholder:text-black input-bordered border-black text-black" : "grow placeholder:text-black input-bordered border-slate-100 text-white"} placeholder="Search"/>
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
      <div className="hero flex items-center justify-start">
        <div className="w-1/3  text-white  p-4">
          <h4 className="text-xl font-bold lg:text-3xl">Incredible Prices on All Your Favorite Items</h4>
          <Link to={'/allproducts'}><button className="bg-screenColor transition-all duration-1000 ease-out hover:bg-hoverColor rounded-xl px-3 md:px-5 py-2 mt-3 cursor-pointer">Shop Now</button></Link>
        </div>
      </div>
    <div className={Theme == 'light' ?  "w-full bg-slate-200  text-screenColor h-full p-2 lg:p-4 mt-4" : "w-full bg-slate-600  text-screenColor h-full p-2 lg:p-4 mt-4"}>
      <h1 className="text-center text-xl lg:text-3xl mt-8">Shop By Category</h1>
      <div className="flex justify-around items-center p-5 flex-wrap">
        <Link to={'/cosmetics'}><Categories img={cosmetics} title={"Cosmetics"}></Categories></Link>
        <Link to={'/housing'}><Categories img={house} title={"House"}></Categories></Link>
        <Link to={'/electronics'}><Categories img={electronics} title={"Electronics"}></Categories></Link>
        <Link to={'/men'}><Categories img={mens} title={"Mens"}></Categories></Link>
        <Link to={'/women'}><Categories img={women} title={"Women"}></Categories></Link>
      </div>
    </div>
    </div>
  );
};

export default Home;