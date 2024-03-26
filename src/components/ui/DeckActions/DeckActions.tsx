import { useState } from 'react'

import { CreateDeckArgs, Deck } from '@/components/pages/Decks/decksTypes'
import { useGetMeQuery } from '@/components/pages/Login/authApi'

import { Button } from '../Button'
import { FormButtons } from '../FormButtons'
import { Icon } from '../Icon/Icon'
import { SuperModal } from '../Modal'
import { useDeleteDeckMutation, usePatchDeckMutation } from '@/components/pages/Decks/decksApi'
import { EditDeckForm } from '@/components/forms/EditDeck/EditDeck'

export const DeckActions = ({ item }: DeckActionsProps) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const [deleteDeck] = useDeleteDeckMutation()
  const [patchDeck] = usePatchDeckMutation()
  const { data: me } = useGetMeQuery()

  const deleteDeckById = (id: string) => {
    deleteDeck({ id })
    setOpenDelete(false)
  }
  const EditDeckById = (data: CreateDeckArgs) => {
    patchDeck({...data, id: item.id})
    setOpenEdit(false)
  }

  return (
    <>
      <Button
        icon={<Icon fill={'white'} height={16} iconId={'play'} width={16} />}
        variant={'blank'}
      />
      {item.userId === me?.id && (
        <>
          {/* <Button
            icon={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
            variant={'blank'}
          /> */}
          <SuperModal
            changeModalState={setOpenEdit}
            customTrigger={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
            open={openEdit}
            title={'Edit Deck'}
            withTrigger
          > 
           <EditDeckForm changeModalState={setOpenEdit} coverSrc={item.cover} isPrivate={item.isPrivate} name={item.name} primaryTextButton='Edit Deck' editDeck={EditDeckById}/>
          </SuperModal>
          <SuperModal
            changeModalState={setOpenDelete}
            customTrigger={<Icon fill={'white'} height={16} iconId={'bin'} width={16} />}
            open={openDelete}
            title={'Delete Deck'}
            withTrigger
          >
            Do you really want to remove {item.name}? All cards will be deleted.
            <FormButtons
              changeModalState={setOpenDelete}
              onClick={() => deleteDeckById(item.id)}
              primaryButtonText={'Delete Deck'}
              withSecondary
            />
          </SuperModal>
        </>
      )}
    </>
  )
}

type DeckActionsProps = {
  item: Deck
}
