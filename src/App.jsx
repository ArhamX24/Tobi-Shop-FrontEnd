import { Outlet } from "react-router-dom"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import { themeContext } from "./Components/ThemeStore"
import { useContext } from "react"
import Footer from "./Components/Footer"

function App() {

  const {Theme} = useContext(themeContext)

  return (
    <div className={Theme == 'light' ?  "bg-light min-h-screen text-black" : "bg-dark min-h-screen text-white"}>
     <Navbar></Navbar>
     <Outlet></Outlet>
     <Footer></Footer>
    </div>
  )
}

export default App
