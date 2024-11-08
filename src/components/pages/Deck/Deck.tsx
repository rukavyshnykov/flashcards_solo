import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { AddNewCardForm } from '@/components/forms/AddNewCard/AddNewCard'
import { EditDeckForm } from '@/components/forms/EditDeck/EditDeck'
import { Button } from '@/components/ui/Button'
import { CardActions } from '@/components/ui/CardActions/CardActions'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import { FormButtons } from '@/components/ui/FormButtons'
import { Icon } from '@/components/ui/Icon/Icon'
import { Input } from '@/components/ui/Input'
import { SuperModal } from '@/components/ui/Modal'
import { Table } from '@/components/ui/Table'
import { Typography } from '@/components/ui/Typography'

import c from './Deck.module.scss'

import {
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  usePatchDeckMutation,
} from '../Decks/decksApi'
import { useGetMeQuery } from '../Login/authApi'

export const DeckPage = () => {
  const navigate = useNavigate()

  const [createCardOpen, setCreateCardOpen] = useState<boolean>(false)
  const [editDeckOpen, setEditDeckOpen] = useState<boolean>(false)
  const [deleteDeckOpen, setDeleteDeckOpen] = useState<boolean>(false)

  const { id } = useParams()
  const { data: me, isFetching: check } = useGetMeQuery()
  const { data: deck, isFetching: check1 } = useGetDeckQuery({ id: id ?? '' })
  const { data: cards, isFetching: check2 } = useGetCardsQuery({ id: id ?? '' })
  const [editDeck] = usePatchDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const deleteDeckById = (id: string) => {
    deleteDeck({ id })
      .unwrap()
      .then(() => {
        // console.log('lol')
        setDeleteDeckOpen(false)
        // navigate('/')
      })
  }

  if (check || check1 || check2) {
    return <>Loader...</>
  }

  if (!deck) {
    return <Navigate to={'/'} />
  }

  const isMyDeck = me?.id === deck?.userId

  return (
    <div className={c.root}>
      <div className={c.headerBar}>
        <Typography className={c.deckTitle} variant={'h1'}>
          {deck?.name}
        </Typography>
        <Dropdown trigger={<Icon fill={'white'} height={18} iconId={'dropdown'} width={18} />}>
          <DropdownItem>
            <Button
              icon={<Icon height={16} iconId={'edit'} width={16} />}
              onClick={() => setEditDeckOpen(true)}
              variant={'blank'}
            >
              <Typography variant={'caption'}>Edit</Typography>
            </Button>
          </DropdownItem>
          <DropdownItem>
            <Button
              icon={<Icon height={16} iconId={'bin'} width={16} />}
              onClick={() => setDeleteDeckOpen(true)}
              variant={'blank'}
            >
              <Typography variant={'caption'}>Delete</Typography>
            </Button>
          </DropdownItem>
        </Dropdown>
        <SuperModal
          changeModalState={setEditDeckOpen}
          open={editDeckOpen}
          title={`Edit ${deck?.name}`}
          withTrigger={false}
        >
          <EditDeckForm
            changeModalState={setEditDeckOpen}
            coverSrc={deck.cover}
            editDeck={() => editDeck}
            isPrivate={deck.isPrivate}
            name={deck.name}
            primaryTextButton={`Edit ${deck.name}`}
          />
        </SuperModal>
        <SuperModal
          changeModalState={setDeleteDeckOpen}
          open={deleteDeckOpen}
          title={`delete ${deck?.name}`}
          withTrigger={false}
        >
          Do you really want to remove {deck.name}? All cards will be deleted.
          <FormButtons
            changeModalState={setDeleteDeckOpen}
            onClick={() => deleteDeckById(deck.id)}
            primaryButtonText={'Delete Deck'}
            withSecondary
          />
        </SuperModal>
        {isMyDeck && (
          <SuperModal
            changeModalState={setCreateCardOpen}
            className={c.addNewCard}
            open={createCardOpen}
            title={'Add New Card'}
            withTrigger
          >
            <AddNewCardForm handleModalChange={setCreateCardOpen} />
          </SuperModal>
        )}
      </div>
      {deck?.cover && (
        <div className={c.cover}>
          <img src={deck.cover} />
        </div>
      )}

      {cards?.items.length ? (
        <>
          <div className={c.searchBar}>
            <Input placeholder={'Search'} />
          </div>
          <Table.Root className={c.table}>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Question</Table.HeadCell>
                <Table.HeadCell>Answer</Table.HeadCell>
                <Table.HeadCell>Last Updated</Table.HeadCell>
                <Table.HeadCell>Grade</Table.HeadCell>
                {isMyDeck && <Table.HeadCell></Table.HeadCell>}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {cards?.items.map(card => (
                <Table.Row key={card.id}>
                  <Table.Cell>{card.question}</Table.Cell>
                  <Table.Cell>{card.answer}</Table.Cell>
                  <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
                  <Table.Cell>{card.grade}</Table.Cell>
                  {isMyDeck && (
                    <Table.Cell>
                      <CardActions card={card} />
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      ) : (
        <>No Cards yet</>
      )}
      {/* <PaginationBar
        itemsPerPage={itemsPerPage}
        page={currentPage}
        setItems={setItems}
        setPage={setPage}
        totalPages={decks?.pagination.totalPages || 200}
      /> */}
    </div>
  )
}
