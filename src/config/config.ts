import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { validateEnvFile } from './config.utils'
import { playgroundTabsConfig } from './playground'

const env = dotenv.config()
dotenvExpand(env)
validateEnvFile()

export const defaultConfig = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.SERVER_HOST,
  port: parseInt(process.env.SERVER_PORT ?? '', 10),
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
    debug: Boolean(process.env.GRAPHQL_PLAYGROUND),
  },
  firebase: {
    scheme: 'Bearer',
    credential: JSON.parse(
      Buffer.from(process.env.FIREBASE_CREDENTIAL ?? '', 'base64').toString('ascii')
    ),
    ...JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON ?? '', 'base64').toString('ascii')
    ),
  },
  database: {
    url: process.env.DATABASE_URL ?? '',
    debug: Boolean(process.env.SQL_DEBUG),
  },
  admin: {
    user: process.env.ADMIN_USER ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
  },
}

export const config = () => defaultConfig
