import { createBrowserRouter } from 'react-router-dom'
import { loginAction, registerAction } from '~/apis/postAPIs'
import { homeLoader, orderLoader, userLoader } from '~/apis/getAPIs'
import ErrorPage from '~/pages/Error/Error'
import Login from '~/pages/Login/Login'
import Home from '~/pages/Home/Home'
import Register from '~/pages/Register/Register'
import UserInfo from '~/pages/UserInfo/UserInfo'
import Order from '~/pages/Order/Order'

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
  }
])
