import { createBrowserRouter } from 'react-router-dom'
import { loginAction, registerAction } from '~/apis/postAPIs'
import { homeLoader, orderLoader, userLoader } from '~/apis/getAPIs'
import ErrorPage from '~/pages/Error/Error'
import Login from '~/pages/Login/Login'
import Home from '~/pages/Home/Home'
import Register from '~/pages/Register/Register'
import UserInfo from '~/pages/UserInfo/UserInfo'
import Order from '~/pages/Order/Order'
import ProductDetail from '~/pages/Product/ProductDetail'
import Payment from '~/pages/Payment/Payment'
import ProductFound from '~/pages/Product/ProductFound'
import CartDetail from '~/pages/CartDetail/cartDetail'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: homeLoader
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
    action: registerAction
  },
  {
    path: '/info',
    element: <UserInfo />,
    errorElement: <ErrorPage />,
    loader: userLoader,
  },
  {
    path: '/orders',
    element: <Order />,
    errorElement: <ErrorPage />,
    loader: orderLoader,
  },
  {
    path: 'products/search',
    element: <ProductFound />,
    errorElement: <ErrorPage />
  },
  {
    path: '/products/:id',
    element: <ProductDetail />,
    errorElement: <ErrorPage />
  },
  {
    path: '/payment',
    element: <Payment />,
    errorElement: <ErrorPage />
  },
  {
    path: '/cart',
    element: <CartDetail />,
    errorElement: <ErrorPage />
  }
])
