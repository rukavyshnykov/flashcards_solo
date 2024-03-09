import { useState } from 'react'

import { PaginationBar } from '@/components/ui/Pagination/Pagination'
import { Table } from '@/components/ui/Table'

import { useGetDecksQuery } from './decksApi'

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const { data } = useGetDecksQuery({
    authorId: '',
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: 30,
    minCardsCount: 10,
    name: '',
    orderBy: null,
  })

  const setPage = (page: number) => {
    setCurrentPage(page)
  }
  const setItems = (items: number) => {
    setItemsPerPage(items)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <PaginationBar setItems={setItems} setPage={setPage} />
    </div>
  )
}
