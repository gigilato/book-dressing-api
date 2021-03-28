import { bookQueries } from './queries/book.playground'
import { userQueries } from './queries/user.playground'
import { loanQueries } from './queries/loan.playground'

const token = 'INSERT_TOKEN'

const headers = {
  ['Authorization']: `Bearer ${token}`,
}

export const playgroundTabsConfig = [
  {
    name: 'User',
    headers,
    query: userQueries,
  },
  {
    name: 'Book',
    headers,
    query: bookQueries,
  },
  {
    name: 'Loan',
    headers,
    query: loanQueries,
  },
]
