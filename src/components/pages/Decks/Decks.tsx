import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon/Icon'
import { Input } from '@/components/ui/Input'
import { PaginationBar } from '@/components/ui/Pagination/Pagination'
import { Slider } from '@/components/ui/Slider'
import { Table } from '@/components/ui/Table'
import { Tabs } from '@/components/ui/Tabs/Tabs'
import { Typography } from '@/components/ui/Typography'
import { useDebounceValue } from 'usehooks-ts'

import c from './Decks.module.scss'

import { useGetMeQuery } from '../Login/authApi'
import { useGetDecksMinMaxQuery, useGetDecksQuery } from './decksApi'

export const DecksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get('page') !== null ? Number(searchParams.get('page')) : 1
  )
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    searchParams.get('items') !== null ? Number(searchParams.get('items')) : 5
  )
  const [name, setName] = useDebounceValue<string>(
    searchParams.get('name') !== null ? String(searchParams.get('name')) : '',
    1000
  )
  const [localName, setLocalName] = useState<string>(name)

  useEffect(() => {
    setName(localName)
  }, [localName])
  const { data: me } = useGetMeQuery()

  const options = [
    {
      label: 'My Decks',
      value: me?.id || '',
    },
    {
      label: 'All Decks',
      value: '',
    },
  ]

  const [authorId, setAuthorId] = useState<string>(options[1].value)

  const {
    currentData: minMaxCurrentData,
    data: minMaxData,
    isLoading: minMaxLoading,
  } = useGetDecksMinMaxQuery()

  const minMax = minMaxCurrentData ?? minMaxData

  const [cardsRange, setCardsRange] = useState<number[]>([
    searchParams.get('min') !== null ? Number(searchParams.get('min')) : minMax?.min ?? 0,
    searchParams.get('max') !== null ? Number(searchParams.get('max')) : minMax?.max ?? 0,
  ])

  const {
    data: decks,
    isFetching: decksFetching,
    isLoading: decksLoading,
  } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount: cardsRange[1],
    minCardsCount: cardsRange[0],
    name,
    orderBy: null,
  })

  const setAuthor = (author: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), authorId: String(author) })
    setAuthorId(author)
  }
  const setPage = (page: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: String(page) })
    setCurrentPage(page)
  }
  const setItems = (items: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), items: String(items) })
    setItemsPerPage(items)
  }
  const setNameParam = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      searchParams.delete('name')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), name: e.target.value })
    }
    setLocalName(e.target.value)
  }
  const handleCardsRangeChange = (value: number[]) => {
    setCardsRange(value)
  }

  const setMinMaxParam = (value: number[]) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      max: String(value[1]),
      min: String(value[0]),
    })
    handleCardsRangeChange(value)
  }

  const resetFilters = () => {
    setSearchParams({})
    setCurrentPage(1)
    setItemsPerPage(5)
    setLocalName('')
    setAuthorId('')
    setCardsRange([0, minMax?.max ?? 0])
  }

  if (minMaxLoading || decksLoading) {
    return <>Loader...</>
  }

  return (
    <div className={c.root}>
      <div className={c.filterBar}>
        <Input onChange={setNameParam} placeholder={'Search by name'} value={localName} />
        <Tabs onChange={setAuthor} options={options} value={authorId} />
        <Slider max={minMax?.max ?? 0} onValueCommit={setMinMaxParam} value={cardsRange} />
        <Button
          icon={<Icon fill={'white'} height={16} iconId={'bin'} width={16} />}
          onClick={resetFilters}
          variant={'secondary'}
        >
          <Typography variant={'subtitle2'}>Reset Filters</Typography>
        </Button>
      </div>
      <Table.Root className={c.table + ` ${decksFetching ? c.disabled : ''}`}>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Cards</Table.HeadCell>
            <Table.HeadCell>Last Updated</Table.HeadCell>
            <Table.HeadCell>Created By</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {decks?.items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <PaginationBar
        itemsPerPage={itemsPerPage}
        page={currentPage}
        setItems={setItems}
        setPage={setPage}
        totalPages={decks?.pagination.totalPages || 200}
      />
    </div>
  )
}
