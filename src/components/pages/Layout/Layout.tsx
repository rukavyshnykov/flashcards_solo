import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/Header'

import c from './Layout.module.scss'

export const Layout = () => {
  return (
    <>
      <Header />
      <div className={c.container}>
        <div className={c.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
