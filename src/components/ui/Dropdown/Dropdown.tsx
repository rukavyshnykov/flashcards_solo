import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Icon } from '../Icon/Icon'

export const Dropdown = ({ children, trigger }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {trigger ?? <Icon height={20} iconId={'dropdown'} width={20} />}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>{children}</DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export const DropdownItem = ({ children, ...rest }: DropdownItemProps) => {
  return <DropdownMenu.Item {...rest}>{children}</DropdownMenu.Item>
}

type DropdownProps = {
  children: ReactNode
  trigger?: ReactNode
}

type DropdownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>
