import React,{useContext} from 'react'
import { themeContext } from './ThemeStore'

const Footer = () => {
    const {Theme} = useContext(themeContext)

  return (
    <div>
        <footer className={Theme == "light" ? "footer footer-center bg-slate-400  p-4" : "footer footer-center bg-slate-800  p-4"}>
    <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by JustBuy Ltd</p>
    </aside>
    </footer>
    </div>
  )
}

export default Footer
