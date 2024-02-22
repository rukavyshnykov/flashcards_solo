import { ComponentPropsWithoutRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import c from './Radio.module.scss'

import { Option } from '../Select'
import { Typography } from '../Typography'

const mockOptions = [
  { label: 'Science', value: '1' },
  { label: 'Sports', value: '2' },
  { label: 'Movie', value: '3' },
  { label: 'Technology', value: '4' },
  { label: 'Music', value: '5' },
]

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  ({ className, options = mockOptions, ...rest }, ref) => {
    return (
      <RadioGroup.Root ref={ref} {...rest} className={c.wrapper + ' ' + className}>
        {options.map(opt => {
          return (
            <Typography as={'label'} className={c.label} key={opt.value} variant={'body2'}>
              <RadioGroup.Item className={c.radio} value={opt.value}>
                <RadioGroup.Indicator className={c.indicator} />
              </RadioGroup.Item>
              <Typography variant={'body2'}>{opt.label}</Typography>
            </Typography>
          )
        })}
      </RadioGroup.Root>
    )
  }
)

type RadioProps = {
  options?: Option[]
} & ComponentPropsWithoutRef<typeof RadioGroup.Root>
