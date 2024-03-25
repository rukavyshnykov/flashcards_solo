import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { AddNewDeckForm } from '@/components/forms/AddNewDeck/AddNewDeck'
import { Button } from '@/components/ui/Button'
import { FormButtons } from '@/components/ui/FormButtons'
import { Icon } from '@/components/ui/Icon/Icon'
import { Input } from '@/components/ui/Input'
import { SuperModal } from '@/components/ui/Modal'
import { PaginationBar } from '@/components/ui/Pagination/Pagination'
import { Slider } from '@/components/ui/Slider'
import { Table } from '@/components/ui/Table'
import { Tabs } from '@/components/ui/Tabs/Tabs'
import { Typography } from '@/components/ui/Typography'
import { useDebounceValue } from 'usehooks-ts'

import c from './Decks.module.scss'

import { useGetMeQuery } from '../Login/authApi'
import {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetDecksMinMaxQuery,
  useGetDecksQuery,
} from './decksApi'
import { CreateDeckArgs } from './decksTypes'

export const DecksPage = () => {
  const [openDeleteDeck, setOpenDeleteDeck] = useState<boolean>(false)
  const [openAddDeck, setOpenAddDeck] = useState<boolean>(false)
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

  const [addNewDeck] = useAddDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  const createNewDeck = (args: CreateDeckArgs) => {
    addNewDeck(args)
    setOpenAddDeck(false)
  }

  const deleteDeckById = (id: string) => {
    deleteDeck({ id })
    setOpenDeleteDeck(false)
  }

  if (minMaxLoading || decksLoading) {
    return <>Loader...</>
  }

  return (
    <div className={c.root}>
      <div className={c.headerBar}>
        <Typography variant={'h1'}>Decks list</Typography>
        <SuperModal
          changeModalState={setOpenAddDeck}
          open={openAddDeck}
          title={'Add New Deck'}
          withTrigger
        >
          <AddNewDeckForm
            changeModalState={setOpenAddDeck}
            createNewDeck={createNewDeck}
            primaryTextButton={'Add New Deck'}
          />
        </SuperModal>
      </div>
      <div className={c.filterBar}>
        <div className={c.searchInput}>
          <Input
            onChange={setNameParam}
            placeholder={'Search by name'}
            type={'text'}
            value={localName}
          />
        </div>

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
          <Table.Row className={c.tRow}>
            <Table.HeadCell className={c.tCell}>Name</Table.HeadCell>
            <Table.HeadCell className={c.tCell}>Cards</Table.HeadCell>
            <Table.HeadCell className={c.tCell}>Last Updated</Table.HeadCell>
            <Table.HeadCell className={c.tCell}>Created By</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {decks?.items.map(item => (
            <Table.Row className={c.tRow} key={item.id}>
              <Table.Cell className={c.tCell}>
                <Link to={`/deck/${item.id}`}>{item.name}</Link>
              </Table.Cell>
              <Table.Cell className={c.tCell}>{item.cardsCount}</Table.Cell>
              <Table.Cell className={c.tCell}>
                {new Date(item.updated).toLocaleDateString('ru-RU')}
              </Table.Cell>
              <Table.Cell className={c.tCell}>{item.author.name}</Table.Cell>
              <Table.Cell className={c.tCell + ' ' + c.deckActions}>
                <Button
                  icon={<Icon fill={'white'} height={16} iconId={'play'} width={16} />}
                  variant={'blank'}
                />
                {item.userId === me?.id && (
                  <>
                    <Button
                      icon={<Icon fill={'white'} height={16} iconId={'edit'} width={16} />}
                      variant={'blank'}
                    />
                    <SuperModal
                      changeModalState={setOpenDeleteDeck}
                      customTrigger={<Icon fill={'white'} height={16} iconId={'bin'} width={16} />}
                      open={openDeleteDeck}
                      title={'Delete Deck'}
                      withTrigger
                    >
                      Do you really want to remove {item.name}? All cards will be deleted.
                      <FormButtons
                        changeModalState={setOpenDeleteDeck}
                        onClick={() => deleteDeckById(item.id)}
                        primaryButtonText={'Delete Deck'}
                        withSecondary
                      />
                    </SuperModal>
                  </>
                )}
              </Table.Cell>
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
