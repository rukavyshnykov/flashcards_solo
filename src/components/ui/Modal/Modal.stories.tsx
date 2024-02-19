import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { SuperModal } from '.'
import { Button } from '../Button'

const meta = {
  argTypes: {
    open: {
      control: { type: 'radio' },
      options: ['Open', 'Closed'],
    },
  },
  component: SuperModal,
  tags: ['autodocs'],
  title: 'Components/SuperModal',
} satisfies Meta<typeof SuperModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <Button variant={'primary'}>sdfsdf</Button>,
    open: false,
    title: 'ModalTitle',
    withTrigger: true,
  },
  render: args => {
    const [state, setState] = useState<boolean>(false)

    const changeModalState = (open: boolean) => {
      setState(!open)
    }

    return <SuperModal {...args} changeModalState={changeModalState} open={state} />
  },
}

export const WithForm: Story = {
  args: {
    children: 'modalContent',
    open: false,
    title: 'ModalTitle',
    withTrigger: true,
  },
  render: args => {
    const [state, setState] = useState<boolean>(false)

    const changeModalState = (open: boolean) => {
      setState(!open)
    }

    return <SuperModal {...args} changeModalState={changeModalState} open={state} />
  },
}
