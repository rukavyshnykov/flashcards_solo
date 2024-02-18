import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import c from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      className={c.button + ` ${c[variant]} ${fullWidth ? c.fullWidth : ''} ${className}`}
      {...rest}
    />
  )
}
