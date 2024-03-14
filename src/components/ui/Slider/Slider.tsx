import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import c from './Slider.module.scss'

import { Typography } from '../Typography'

export const Slider = ({ max, onValueCommit, value }: PropsType) => {
  const [range, setRange] = useState(value)

  if (range[1] === 0) {
    setRange([value[0], max])
  }

  useEffect(() => {
    setRange(value)
  }, [value])

  return (
    <div className={c.root}>
      <Typography className={c.indicator} variant={'body1'}>
        {range[0]}
      </Typography>
      <RadixSlider.Root
        className={c.slider}
        max={max}
        onValueChange={value => setRange(value)}
        onValueCommit={onValueCommit}
        value={range}
      >
        <RadixSlider.Track className={c.track}>
          <RadixSlider.Range className={c.range} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={c.thumb} />
        <RadixSlider.Thumb className={c.thumb} />
      </RadixSlider.Root>
      <Typography className={c.indicator} variant={'body1'}>
        {range[1]}
      </Typography>
    </div>
  )
}

type SliderProps = {
  max: number
  value: number[]
}

type PropsType = SliderProps &
  Omit<ComponentPropsWithoutRef<typeof RadixSlider.Root>, keyof SliderProps>
