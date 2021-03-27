import * as dotenv from 'dotenv'
import { validateEnvFile } from './config.utils'
import { playgroundTabsConfig } from './playground'

dotenv.config()
validateEnvFile()

export const defaultConfig = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT ?? '', 10),
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  graphql: {
    playground: Boolean(process.env.GRAPHQL_PLAYGROUND)
      ? {
          workspaceName: 'kara-api',
          tabs: playgroundTabsConfig.map((tab) => ({
            ...tab,
            endpoint: `${process.env.SERVER_HOST}${process.env.GRAPHQL_ENDPOINT}`,
          })),
        }
      : false,
    path: process.env.GRAPHQL_ENDPOINT,
    introspection: true,
    debug: process.env.GRAPHQL_PLAYGROUND === 'true' ? true : false,
  },
  firebase: JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? '', 'base64').toString('ascii')
  ),
  mysql: {
    database: process.env.MYSQL_DATABASE ?? '',
    username: process.env.MYSQL_USERNAME ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    port: parseInt(process.env.MYSQL_PORT ?? '', 10),
    host: process.env.MYSQL_HOST ?? '',
    debug: Boolean(process.env.MYSQL_DEBUG ?? ''),
  },
}

export const config = () => defaultConfig
