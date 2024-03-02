import { Link } from 'react-router-dom'

import logo from '@/assets/logo.png'
import placeholder from '@/assets/placeholder.jpg'

import c from './Header.module.scss'

import { Button } from '../Button'
import { Dropdown, DropdownItem } from '../Dropdown'
import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography'

export const Header = () => {
  return (
    <div className={c.container}>
      <div className={c.content}>
        <Button as={Link} to={'/'} variant={'blank'}>
          <img className={c.logo} src={logo} />
        </Button>
        <div className={c.personalData}>
          <Typography className={c.name} variant={'subtitle1'}>
            Name
          </Typography>
          <Dropdown trigger={<img className={c.avatar} src={placeholder} />}>
            <DropdownItem>
              <img className={c.avatar} src={placeholder} />
              <div className={c.info}>
                <Typography variant={'subtitle2'}>Name</Typography>
                <Typography className={c.email} variant={'caption'}>
                  j&johnson@gmail.com
                </Typography>
              </div>
            </DropdownItem>
            <DropdownItem>
              <Icon height={16} iconId={'profile'} width={16} />
              <Typography variant={'caption'}>My Profile</Typography>
            </DropdownItem>
            <DropdownItem>
              <Button as={Link} to={'/login'}>
                <Icon height={16} iconId={'out'} width={16} />
                <Typography variant={'caption'}>Sign Out</Typography>
              </Button>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
