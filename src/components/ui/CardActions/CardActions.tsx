import { useState } from 'react'

import { useDeleteCardMutation } from '@/components/pages/Decks/decksApi'
import { Card } from '@/components/pages/Decks/decksTypes'

import { FormButtons } from '../FormButtons'
import { Icon } from '../Icon/Icon'
import { SuperModal } from '../Modal'

export const CardActions = ({ card }: CardActionsProps) => {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [deleteCard] = useDeleteCardMutation()

  const onDelete = () => {
    deleteCard({ id: card.id })
    setDeleteOpen(false)
  }

  return (
    <>
      <SuperModal
        changeModalState={setEditOpen}
        customTrigger={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
        open={editOpen}
        title={'Edit Card'}
        withTrigger
      >
        zhopa
      </SuperModal>
      <SuperModal
        changeModalState={setDeleteOpen}
        customTrigger={<Icon fill={'white'} height={16} iconId={'bin'} width={16} />}
        open={deleteOpen}
        title={'Delete Card'}
        withTrigger
      >
        Do you really want to delete {card.question} card?
        <FormButtons
          changeModalState={setDeleteOpen}
          onClick={onDelete}
          primaryButtonText={'Delete Card'}
          withSecondary
        />
      </SuperModal>
    </>
  )
}

type CardActionsProps = {
  card: Card
}
