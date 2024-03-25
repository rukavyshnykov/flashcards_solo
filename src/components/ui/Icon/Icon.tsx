import { ComponentPropsWithoutRef } from 'react'

import Sprite from '@/assets/sprite.svg'

export const Icon = ({ height, iconId, width, ...rest }: PropsType) => {
  return (
    <svg height={height + 'px'} style={{ display: 'block' }} width={width + 'px'} {...rest}>
      <use href={`${Sprite}#${iconId}`} />
    </svg>
  )
}

type IconProps = {
  height: number
  iconId: string
  width: number
}

type PropsType = IconProps & Omit<ComponentPropsWithoutRef<'svg'>, keyof IconProps>
