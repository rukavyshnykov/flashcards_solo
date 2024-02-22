import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from '.'

const meta = {
  component: EditProfileForm,
  tags: ['autodocs'],
  title: 'Components/EditProfileForm',
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
