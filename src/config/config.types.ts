import { defaultConfig } from './config'

export type Config = typeof defaultConfig
export type GraphQLConfig = typeof defaultConfig.graphql
export type FirebaseConfig = {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}
export type MysqlConfig = typeof defaultConfig.mysql
export type AdminConfig = typeof defaultConfig.admin
