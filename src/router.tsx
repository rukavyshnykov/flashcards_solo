import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { DecksPage } from './components/pages/Decks/Decks'
import { ForgotPasswordPage } from './components/pages/ForgotPassword/ForgotPassword'
import { Layout } from './components/pages/Layout/Layout'
import { LoginPage } from './components/pages/Login/Login'
import { RegisterPage } from './components/pages/Register/Register'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <RegisterPage />,
    path: '/register',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
]

const router = createBrowserRouter([
  {
    children: [...publicRoutes, ...privateRoutes],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
