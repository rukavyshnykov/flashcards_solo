import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { Input } from '.'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    label: 'Check',
    placeholder: 'just checking',
    type: 'text',
  },
  render: args => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return <Input {...args} onChange={handleChange} value={value} />
  },
}

export const Password: Story = {
  args: {
    label: 'Check',
    placeholder: 'just checking',
    type: 'password',
  },
  render: args => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return <Input {...args} onChange={handleChange} value={value} />
  },
}

export const WithError: Story = {
  args: {
    errorMessage: 'This is an error message',
    label: 'Check',
    placeholder: 'just checking',
    type: 'text',
  },
  render: args => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return <Input {...args} onChange={handleChange} value={value} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Check',
    placeholder: 'just checking',
    type: 'text',
  },
  render: args => {
    const [value, setValue] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return <Input {...args} onChange={handleChange} value={value} />
  },
}
