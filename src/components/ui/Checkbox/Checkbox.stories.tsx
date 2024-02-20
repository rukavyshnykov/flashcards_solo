import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { SuperCheckbox } from './Checkbox'

const meta = {
  component: SuperCheckbox,
  tags: ['autodocs'],
  title: 'Components/SuperCheckbox',
} satisfies Meta<typeof SuperCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => {
    const [value, setValue] = useState<boolean>(false)
    const handleChange = () => {
      setValue(!value)
    }

    return <SuperCheckbox {...args} checked={value} onCheckedChange={handleChange} />
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Checkbox',
  },
  render: args => {
    const [value, setValue] = useState<boolean>(false)
    const handleChange = () => {
      setValue(!value)
    }

    return <SuperCheckbox {...args} checked={value} onCheckedChange={handleChange} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Checkbox',
  },
  render: args => {
    const [value, setValue] = useState<boolean>(true)
    const handleChange = () => {
      setValue(!value)
    }

    return <SuperCheckbox {...args} checked={value} onCheckedChange={handleChange} />
  },
}
