import React,{useContext} from 'react'
import { themeContext } from './ThemeStore'
import { useDispatch } from 'react-redux'
import { addItem } from '../Store/CartSlice'


const Card = ({data}) => {
    const {Theme} = useContext(themeContext)
    let dispatch = useDispatch()

    let {thumbnail, price, title} = data;

    const handleAddCart = (event) => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(addItem(data));
    }
    

  return (
    <div>
      <div className={Theme == 'light' ?  "card bg-slate-100 w-72 m-5 cursor-pointer" : "card bg-slate-600 w-72 m-5 cursor-pointer"}>
        <figure className="px-10 pt-10">
            <img
            src={thumbnail}
            alt="Shoes"
            className="rounded-xl transition-all ease-in-out duration-500 hover:scale-105" />
        </figure>
            <div className="card-body items-center text-center">
                <h3>{title}</h3>
                <p>{price}$</p>
                <div className="card-actions">
                    <button onClick={(event)=> {handleAddCart(event)}} className={Theme == 'light'  ? "btn btn-primary bg-screenColor hover:bg-hoverColor transition-all ease-in-out duration-500 text-white" : "btn btn-outline  hover:bg-slate-700 hover:text-white transition-all ease-in-out duration-500 text-white"}>Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
