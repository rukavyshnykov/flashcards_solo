import { ComponentPropsWithoutRef, ElementType } from 'react'

import c from './Typography.module.scss'

type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  variant:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>(props: TypographyProps<T>) => {
  const { as: Component = 'span', variant, ...rest } = props

  return <Component className={c[variant]} {...rest} />
}
