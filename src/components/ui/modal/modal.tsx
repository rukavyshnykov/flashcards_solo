import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import c from './modal.module.scss'

type SuperModalProps = {
  children: ReactNode
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  withSecondary: boolean
}

export const SuperModal = ({ children, open, setOpen, title, withSecondary }: SuperModalProps) => (
  <Dialog.Root onOpenChange={() => setOpen(open)} open={open}>
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <div className={c.header}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Close />
        </div>
        <div className={c.content}>{children}</div>
        {withSecondary ? (
          <div className={c.footer}>
            <button>sdfsdf</button>
            <button>sdfs</button>
          </div>
        ) : (
          <div className={c.footer}>
            <button></button>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
