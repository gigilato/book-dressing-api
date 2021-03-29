import { defaultConfig } from './config'

export type Config = typeof defaultConfig
export type GraphQLConfig = typeof defaultConfig.graphql
export type FirebaseConfig = {
  scheme: 'string'
  credential: {
    type: string
    project_id: string
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_x509_cert_url: string
  }
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
