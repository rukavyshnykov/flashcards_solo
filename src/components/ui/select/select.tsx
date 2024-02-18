import * as Select from '@radix-ui/react-select'

import c from './select.module.scss'

import { Icon } from '../Icon/Icon'

type Option = {
  text: string
  value: string
}

type SelectProps = {
  disabled?: boolean
  isPagination: boolean
  options?: Option[]
}

const mockOptions = [
  { text: 'opt1', value: 'opt1' },
  { text: 'opt2', value: 'opt2' },
  { text: 'opt3', value: 'opt3' },
  { text: 'opt4', value: 'opt4' },
  { text: 'opt5', value: 'opt5' },
]

export const SuperSelect = ({ disabled, options = mockOptions }: SelectProps) => (
  <Select.Root>
    <Select.Trigger className={c.trigger} disabled={disabled}>
      <Select.Value
        placeholder={options.length ? 'Select something...' : 'Nothing to choose here'}
      />
      <Select.Icon className={c.icon}>
        <Icon height={24} iconId={'close'} width={24} />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content avoidCollisions={false} className={c.content} position={'popper'}>
        <Select.Viewport>
          {options.map(({ text, value }: Option) => {
            return (
              <Select.Item className={c.item} key={value} value={value}>
                <Select.ItemText>{text}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)
