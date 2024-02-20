import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <Card {...args}>
        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
        ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{' '}
      </Card>
    )
  },
}
