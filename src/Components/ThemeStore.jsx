import React,{useState, createContext} from 'react'


export const themeContext = createContext(null)

const ThemeStore = ({children}) => {
    const [Theme, setTheme] = useState('light')

  return (
    <themeContext.Provider value={{Theme, setTheme}}>
        {children}
    </themeContext.Provider>
  )
}
export default ThemeStore
