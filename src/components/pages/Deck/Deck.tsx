import { useParams } from 'react-router-dom'

import { PaginationBar } from '@/components/ui/Pagination/Pagination'
import { Table } from '@/components/ui/Table'
import { skip } from 'node:test'

import c from './Deck.module.scss'

import { useGetCardsQuery, useGetDeckQuery } from '../Decks/decksApi'

export const DeckPage = () => {
  const { id } = useParams()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' }, { skip: Boolean(id) })
  const { data: cards } = useGetCardsQuery({ id: id ?? '' }, { skip: !deck })

  console.log(Boolean(deck))

  return (
    <div className={c.root}>
      <Table.Root className={c.table}>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {/* {?.items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
            </Table.Row>
          ))} */}
        </Table.Body>
      </Table.Root>
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
