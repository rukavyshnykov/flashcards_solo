import { ComponentPropsWithoutRef, ElementType } from 'react'

import c from './Card.module.scss'

export const Card = <T extends ElementType = 'div'>(props: CardProps<T>) => {
  const { as: Component = 'div', ...rest } = props

  return <Component {...rest} className={c.card} />
}

type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>
