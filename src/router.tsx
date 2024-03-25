import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DeckPage } from './components/pages/Deck/Deck'
import { DecksPage } from './components/pages/Decks/Decks'
import { ForgotPasswordPage } from './components/pages/ForgotPassword/ForgotPassword'
import { Layout } from './components/pages/Layout/Layout'
import { LoginPage } from './components/pages/Login/Login'
import { useGetMeQuery } from './components/pages/Login/authApi'
import { MyProfilePage } from './components/pages/MyProfile/MyProfile'
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
  {
    element: <DeckPage />,
    path: '/deck/:id',
  },
  {
    element: <MyProfilePage />,
    path: '/edit-profile',
  },
]

const PrivateRoutes = () => {
  const { isError, isLoading } = useGetMeQuery()

  if (isLoading) {
    return <>Loader...</>
  }

  return isError ? <Navigate to={'/login'} /> : <Outlet />
}

export const router = createBrowserRouter([
  {
    children: [
      ...publicRoutes,
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
