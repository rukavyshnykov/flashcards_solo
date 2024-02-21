import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '.'

const meta = {
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'Components/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
