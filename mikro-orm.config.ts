import * as dotenv from 'dotenv'
import { User } from './src/modules/user/user.entity'

dotenv.config()

export default {
  entities: [User],
  type: 'mysql',
  dbName: process.env?.MYSQL_DATABASE,
  user: process.env?.MYSQL_USERNAME,
  password: process.env?.MYSQL_PASSWORD,
  host: process.env?.MYSQL_HOST,
  port: process.env?.MYSQL_PORT,
  migrations: {
    path: './migrations',
    tableName: 'migrations',
    transactional: true,
  },
}
