import React,{useContext} from 'react'
import { themeContext } from './ThemeStore'

const ProductsShimmer = () => {
    const {Theme} = useContext(themeContext)
  return (
    <>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    <div className="flex w-72 flex-col m-5 gap-4">
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-32 w-full" : "skeleton bg-slate-600 h-32 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-28" : "skeleton bg-slate-600 h-4 w-28"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full": "skeleton bg-slate-600 h-4 w-full"}></div>
        <div className={Theme == "light" ? "skeleton bg-slate-200 h-4 w-full" : "skeleton bg-slate-600 h-4 w-full"}></div>
    </div>
    </>
  )
}

export default ProductsShimmer
