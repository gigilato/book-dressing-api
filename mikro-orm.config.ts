import * as dotenv from 'dotenv'
import { Book } from './src/modules/book/book.entity'
import { Loan } from './src/modules/loan/loan.entity'
import { User } from './src/modules/user/user.entity'

dotenv.config()

export default {
  entities: [User, Book, Loan],
  type: 'postgresql',
  dbName: process.env?.SQL_DATABASE,
  user: process.env?.SQL_USERNAME,
  password: process.env?.SQL_PASSWORD,
  host: process.env?.SQL_HOST,
  port: process.env?.SQL_PORT,
  migrations: {
    path: './migrations',
    tableName: 'migrations',
    transactional: true,
  },
}
