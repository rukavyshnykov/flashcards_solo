import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import c from './Button.module.scss'

import { Icon } from '../Icon/Icon'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  iconId?: string
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    iconId,
    variant = 'primary',
    ...rest
  } = props

  return (
    <Component
      className={c.button + ` ${c[variant]} ${fullWidth ? c.fullWidth : ''} ${className}`}
      {...rest}
    >
      {iconId && <Icon fill={'white'} height={16} iconId={iconId} width={16} />}
      {children}
    </Component>
  )
}
