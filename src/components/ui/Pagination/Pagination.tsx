import { useState } from 'react'

import c from './Pagination.module.scss'

import { Button } from '../Button'
import { Icon } from '../Icon/Icon'
import { SuperSelect } from '../Select'

const SelectOptions = [
  {
    label: '5',
    value: '5',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '20',
    value: '20',
  },
]

const gap = '...'

export const PaginationBar = ({
  itemsPerPage,
  page,
  setItems,
  setPage,
  totalItems,
  totalPages,
}: PaginationProps) => {
  const [value, setValue] = useState<number>(itemsPerPage)
  const onSelectChange = (value: string) => {
    setValue(+value)
    setItems(Number(value))
  }
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step)

  const [curp, setCur] = useState(+page)

  const setCurp = (page: number) => {
    setCur(page)
    setPage(page)
  }

  const pagesArr = [curp - 1, curp, curp + 1]

  const edgesArr =
    curp <= 4
      ? arrayRange(2, 4, 1)
      : curp >= totalPages - 4
        ? arrayRange(totalPages - 3, totalPages - 1, 1)
        : []

  return (
    <div className={c.root}>
      <div className={c.pagination}>
        <Button
          className={c.prev}
          disabled={curp === 1}
          icon={<Icon height={16} iconId={'prev'} width={16} />}
          onClick={() => setCurp(page - 1)}
          type={'button'}
          variant={'blank'}
        />
        <Button
          className={curp === 1 ? c.current : ''}
          onClick={() => setCurp(1)}
          type={'button'}
          variant={'blank'}
        >
          1
        </Button>
        {curp > 4 && <div className={c.gap}>{gap}</div>}

        {/* ----------IF CLOSE TO EDGES---------- */}
        {(curp <= 4 || curp >= totalPages - 4) &&
          edgesArr.map(page => (
            <Button
              className={page === curp ? c.current : ''}
              key={page}
              onClick={() => setCurp(page)}
              type={'button'}
              variant={'blank'}
            >
              {page}
            </Button>
          ))}
        {/* ----------IF CLOSE TO EDGES---------- */}

        {/* ----------IF FAR FROM EDGES---------- */}
        {curp > 4 &&
          curp < totalPages - 4 &&
          pagesArr.map(page => (
            <Button
              className={page === curp ? c.current : ''}
              key={page}
              onClick={() => setCurp(page)}
              type={'button'}
              variant={'blank'}
            >
              {page}
            </Button>
          ))}
        {/* ----------IF FAR FROM EDGES---------- */}

        {curp < totalPages - 4 && <div className={c.gap}>{gap}</div>}
        <Button
          className={curp === totalPages ? c.current : ''}
          onClick={() => setCurp(totalPages)}
          type={'button'}
          variant={'blank'}
        >
          {totalPages}
        </Button>
        <Button
          className={c.next}
          disabled={curp === totalPages}
          icon={<Icon height={16} iconId={'next'} width={16} />}
          onClick={() => setCurp(page + 1)}
          type={'button'}
          variant={'blank'}
        />
      </div>
      <div className={c.select}>
        Показать
        <SuperSelect
          handleSelectChange={onSelectChange}
          isPagination
          options={SelectOptions}
          value={String(value)}
        />
        на странице
      </div>
    </div>
  )
}

type PaginationProps = {
  itemsPerPage: number
  page: number
  setItems: (items: number) => void
  setPage: (page: number) => void
  totalItems?: number
  totalPages: number
}
