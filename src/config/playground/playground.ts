import { bookQueries } from './queries/book.playground'

const token = 'INSERT_TOKEN'

const headers = {
  ['Authorization']: `Bearer ${token}`,
}

export const playgroundTabsConfig = [
  {
    name: 'Book',
    headers,
    query: bookQueries,
  },
]
