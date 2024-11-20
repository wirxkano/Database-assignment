import { createBrowserRouter } from 'react-router-dom'
import { loginAction, registerAction } from '~/apis/postAPIs'
import ErrorPage from '~/pages/Error/Error'
import Login from '~/pages/Login/Login'
import Home from '~/pages/Home/Home'
import Register from '~/pages/Register/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
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
  }
])
