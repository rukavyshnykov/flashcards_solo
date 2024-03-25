export type DecksArgs = {
  authorId?: null | string
  currentPage?: null | number
  itemsPerPage?: null | number
  maxCardsCount?: null | number
  minCardsCount?: null | number
  name?: null | string
  orderBy?: null | string
}

export type DecksResponse = {
  items: Deck[]
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export interface Deck {
  author: Author
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export interface Author {
  id: string
  name: string
}

export type MinMax = {
  max: number
  min: number
}

export type CreateDeckArgs = {
  cover: File | null
  isPrivate: boolean | null
  name: string
}
