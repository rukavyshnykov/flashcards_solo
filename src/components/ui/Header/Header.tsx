import { Link } from 'react-router-dom'

import logo from '@/assets/logo.png'
import placeholder from '@/assets/placeholder.jpg'
import { useGetMeQuery, useLogoutMutation } from '@/components/pages/Login/authApi'

import c from './Header.module.scss'

import { Button } from '../Button'
import { Dropdown, DropdownItem } from '../Dropdown'
import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography'

export const Header = () => {
  const { data: me, isError } = useGetMeQuery()
  const [logout] = useLogoutMutation()

  return (
    <div className={c.container}>
      <div className={c.content}>
        <Button as={Link} to={'/'} variant={'blank'}>
          <img className={c.logo} src={logo} />
        </Button>
        <div className={c.personalData}>
          {isError ? (
            <Button as={Link} className={c.signIn} to={'/login'} variant={'secondary'}>
              Sign In
            </Button>
          ) : (
            <>
              <Typography className={c.name} variant={'subtitle1'}>
                {me?.name}
              </Typography>
              <Dropdown
                trigger={<img className={c.avatar} src={me?.avatar ? me?.avatar : placeholder} />}
              >
                <DropdownItem>
                  <img className={c.avatar} src={me?.avatar ? me?.avatar : placeholder} />
                  <div className={c.info}>
                    <Typography variant={'subtitle2'}>{me?.name}</Typography>
                    <Typography className={c.email} variant={'caption'}>
                      {me?.email}
                    </Typography>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Link className={c.myProfile} to={'/edit-profile'}>
                    <Icon height={16} iconId={'profile'} width={16} />
                    <Typography variant={'caption'}>My Profile</Typography>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Button onClick={() => logout()} type={'button'} variant={'blank'}>
                    <Icon height={16} iconId={'out'} width={16} />
                    <Typography variant={'caption'}>Sign Out</Typography>
                  </Button>
                </DropdownItem>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
