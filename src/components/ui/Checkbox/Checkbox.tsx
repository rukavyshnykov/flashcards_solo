import { forwardRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'

import c from './Checkbox.module.scss'

import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography'

export const SuperCheckbox = forwardRef(({ label, ...rest }: SuperCheckboxProps, ref) => (
  <Typography as={'label'} className={c.label + ' ' + c.wrapper} variant={'body2'}>
    <Checkbox.Root {...rest} className={c.root}>
      <Checkbox.Indicator className={c.iconWrapper}>
        <Icon className={c.icon} height={14} iconId={'check-mark'} width={14} />
      </Checkbox.Indicator>
    </Checkbox.Root>
    {label}
  </Typography>
))

export type SuperCheckboxProps = {
  checked?: boolean
  disabled?: boolean
  label?: string
  name: string
  onCheckedChange?: () => void
}
