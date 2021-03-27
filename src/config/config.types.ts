import { defaultConfig } from './config'

export type Config = typeof defaultConfig
export type JwtConfig = typeof defaultConfig.jwt
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
