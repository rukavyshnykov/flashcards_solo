import * as Select from '@radix-ui/react-select'

import c from './Select.module.scss'

import { Icon } from '../Icon/Icon'

export const SuperSelect = ({
  disabled,
  handleSelectChange,
  label,
  options,
  value,
}: SelectProps) => (
  <>
    {label && <span>{label}</span>}
    <Select.Root
      defaultValue={value}
      onValueChange={value => handleSelectChange(value)}
      value={value}
    >
      <Select.Trigger className={c.trigger} disabled={disabled}>
        <Select.Value
          placeholder={options?.length ? 'Select something...' : 'Nothing to choose here'}
        />
        <Select.Icon className={c.icon}>
          <Icon height={24} iconId={'close'} width={24} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content avoidCollisions={false} className={c.content} position={'popper'}>
          <Select.Viewport>
            {options?.map(({ label, value }: Option) => {
              return (
                <Select.Item className={c.item} key={value} value={value}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </>
)

type Option = {
  label: string
  value: string
}

type SelectProps = {
  disabled?: boolean
  handleSelectChange: (value: string) => void
  isPagination?: boolean
  label?: string
  options?: Option[]
  value?: string
}
