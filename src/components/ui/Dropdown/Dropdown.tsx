import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import c from './Dropdown.module.scss'

import { Icon } from '../Icon/Icon'

export const Dropdown = ({ children, trigger }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={c.trigger}>
        {trigger ?? <Icon height={24} iconId={'dropdown'} width={24} />}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={'end'}
          alignOffset={-11}
          className={c.content}
          side={'bottom'}
          sideOffset={2}
        >
          {children}
          <DropdownMenu.Arrow className={c.arrow1} height={8} width={16} />
          <DropdownMenu.Arrow className={c.arrow2} height={8} width={16} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export const DropdownItem = ({ children, className, ...rest }: DropdownItemProps) => {
  return (
    <>
      <DropdownMenu.Item className={c.item + ` ${className}`} {...rest}>
        {children}
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={c.separator} />
    </>
  )
}

type DropdownProps = {
  children: ReactNode
  trigger?: ReactNode
}

type DropdownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>
