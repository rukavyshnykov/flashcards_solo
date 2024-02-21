import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '.'

const meta = {
  component: SignUpForm,
  tags: ['autodocs'],
  title: 'Components/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
