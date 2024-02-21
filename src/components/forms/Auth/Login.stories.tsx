import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from '.'

const meta = {
  component: LoginForm,
  tags: ['autodocs'],
  title: 'Components/LoginForm',
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
