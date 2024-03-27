import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Table } from '@/components/ui/Table'
import { Typography } from '@/components/ui/Typography'

import c from './Deck.module.scss'

import { useGetCardsQuery, useGetDeckQuery } from '../Decks/decksApi'
import { useGetMeQuery } from '../Login/authApi'

export const DeckPage = () => {
  const { id } = useParams()
  const { data: me, isFetching: check } = useGetMeQuery()
  const { data: deck, isFetching: check1 } = useGetDeckQuery({ id: id ?? '' })
  const { data: cards, isFetching: check2 } = useGetCardsQuery({ id: id ?? '' })

  if (check || check1 || check2) {
    return <>Loader...</>
  }

  const isMyDeck = me?.id === deck?.userId

  return (
    <div className={c.root}>
      <div className={c.headerBar}>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        {isMyDeck && <Button variant={'primary'}>Add New Card</Button>}
      </div>
      {cards?.items.length ? (
        <Table.Root className={c.table}>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Question</Table.HeadCell>
              <Table.HeadCell>Answer</Table.HeadCell>
              <Table.HeadCell>Last Updated</Table.HeadCell>
              <Table.HeadCell>Grade</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {cards?.items.map(card => (
              <Table.Row key={card.id}>
                <Table.Cell>{card.question}</Table.Cell>
                <Table.Cell>{card.answer}</Table.Cell>
                <Table.Cell>{new Date(card.updated).toLocaleDateString('ru-RU')}</Table.Cell>
                <Table.Cell>{card.grade}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <>Empty Space</>
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
