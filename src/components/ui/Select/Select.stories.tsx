import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { SuperSelect } from '.'

const meta = {
  component: SuperSelect,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof SuperSelect>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { label: 'Science', value: '1' },
  { label: 'Sports', value: '2' },
  { label: 'Movie', value: '3' },
  { label: 'Technology', value: '4' },
  { label: 'Music', value: '5' },
]

export const Default: Story = {
  args: {
    disabled: false,
    isPagination: false,
    label: 'Select-box',
    options: options,
  },
  render: args => {
    const [selectedValue, setSelectedValue] = useState<string>(args.options![0].value)
    const handleSelectChange = (value: string) => {
      setSelectedValue(value)
    }

    return <SuperSelect {...args} handleSelectChange={handleSelectChange} value={selectedValue} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Select-box',
    options,
  },
  render: args => {
    const [selectedValue, setSelectedValue] = useState<string>(args.options![0].value)
    const handleSelectChange = (value: string) => {
      setSelectedValue(value)
    }

    return <SuperSelect {...args} handleSelectChange={handleSelectChange} value={selectedValue} />
  },
}
