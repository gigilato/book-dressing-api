import { Connection, IDatabaseDriver } from '@mikro-orm/core'
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs'
import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { Book } from './src/modules/book/book.entity'
import { Loan } from './src/modules/loan/loan.entity'
import { User } from './src/modules/user/user.entity'

const env = dotenv.config()
dotenvExpand(env)

const config: MikroOrmModuleOptions<IDatabaseDriver<Connection>> = {
  entities: [User, Book, Loan],
  type: 'postgresql',
  clientUrl: process.env?.DATABASE_URL,
  migrations: {
    path: './migrations',
    tableName: 'migrations',
    transactional: true,
  },
}

export default config
