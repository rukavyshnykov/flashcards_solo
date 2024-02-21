import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import c from './Input.module.scss'

import { Icon } from '../Icon/Icon'
import { Typography } from '../Typography'

export const Input = forwardRef<HTMLInputElement, PropsType>(
  ({ errorMessage, label, type, ...rest }, ref) => {
    const [visible, setVisible] = useState<boolean>(false)

    const [localType, setLocalType] = useState(type)

    const handleVisibility = () => {
      setVisible(!visible)
      setLocalType(localType === 'password' ? 'text' : 'password')
    }

    return (
      <div className={c.wrapper}>
        <Typography as={'label'} variant={'body2'}>
          {label}
          <div className={c.inputWrapper}>
            <input
              className={c.input + ` ${errorMessage ? c.error : ''}`}
              placeholder={rest.placeholder}
              ref={ref}
              type={localType}
              {...rest}
            />
            {type === 'password' && (
              <InputVisibilityIcon
                className={c.icon}
                handleVisibility={handleVisibility}
                iconId={localType === 'password' ? 'eye-open' : 'eye-closed'}
              />
            )}
          </div>
          {errorMessage && (
            <Typography className={c.error} variant={'caption'}>
              {errorMessage}
            </Typography>
          )}
        </Typography>
      </div>
    )
  }
)

const InputVisibilityIcon = ({ handleVisibility, ...rest }: InputVisibilityIconProps) => {
  return <Icon height={20} onClick={handleVisibility} width={20} {...rest} />
}

type InputVisibilityIconProps = {
  className: string
  handleVisibility: () => void
  iconId: string
}

export type InputProps = {
  errorMessage?: string
  label?: string
  onChange: () => void
  type?: 'password' | 'search' | 'text'
  value?: string
}

type PropsType = InputProps & Omit<ComponentPropsWithoutRef<'input'>, keyof InputProps>
