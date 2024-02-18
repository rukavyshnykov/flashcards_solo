import Sprite from '@/assets/sprite.svg'

export const Icon = ({ height, iconId, width }: IconProps) => {
  return (
    <svg height={height + 'px'} width={width + 'px'}>
      <use href={`${Sprite}#${iconId}`} />
    </svg>
  )
}

type IconProps = {
  height: number
  iconId: string
  width: number
}
