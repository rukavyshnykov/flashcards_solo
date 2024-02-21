import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '.'

const meta = {
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'Components/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
