import ThemeStore from './Components/ThemeStore.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Profile from './Components/Profile.jsx'
import Cart from './Components/Cart.jsx'
import ErrorPage from './Components/ErrorPage.jsx'
import AllProductsPage from './Screens/AllProductsPage.jsx'
import CosmeticsProductsPage from './Screens/CosmeticsProductsPage.jsx'
import HousingProducts from './Screens/HousingProducts.jsx'
import MensPage from './Screens/MensPage.jsx'
import WomenPage from './Screens/WomenPage.jsx'
import Electronics from './Screens/Electronics.jsx'
import ProductPage from './Components/ProductPage.jsx'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import CheckOutPage from './Components/CheckOutPage.jsx'
import WishList from './Components/WishList.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/Signup.jsx'
import AuthWrapper from './Components/AuthWrapper.jsx'


let AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthWrapper><App/></AuthWrapper>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/cart",
        element: <Cart></Cart>
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>
      },
      {
        path: "/allproducts",
        element: <AllProductsPage></AllProductsPage>
      },
      {
        path: "/cosmetics",
        element: <CosmeticsProductsPage></CosmeticsProductsPage>
      },
      {
        path: "/housing",
        element: <HousingProducts></HousingProducts>
      },
      {
        path: "/men",
        element: <MensPage></MensPage>
      },
      {
        path: "/women",
        element: <WomenPage></WomenPage>
      },
      {
        path: "/electronics",
        element: <Electronics></Electronics>
      },
      {
        path: "/product/:id",
        element: <ProductPage></ProductPage>
      },
      {
        path: "/checkout",
        element: <CheckOutPage></CheckOutPage>
      },
      {
        path: '/wishlist',
        element: <WishList></WishList>
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
  <ThemeStore>
    <RouterProvider router={AppRouter} />
  </ThemeStore>
  </Provider>
)
