import type { Meta, StoryObj } from '@storybook/react'

import { FileUploader } from '.'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'Components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    iconId: 'edit',
  },
}

export const OnlyIcon: Story = {
  args: {
    fullWidth: false,
    iconId: 'edit',
  },
}
