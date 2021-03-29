import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import axios from 'axios'
import { CreateUser, CreateUserPayload } from './process-signup.types'

admin.initializeApp(functions.config().firebase)

const authUser = 'gigilato'
const authPassword = 'RpZTbvfmxXacJE54'

export const processSignUp = functions.auth.user().onCreate(async (user) => {
  const basicKey = Buffer.from(`${authUser}:${authPassword}`).toString('base64')
  const authorization = `Basic ${basicKey}`
  const data: CreateUserPayload = {
    email: user.email as string,
    firebaseId: user.uid,
  }
  await axios.post<CreateUser>('http://localhost:3333/user/create', data, {
    headers: { authorization },
  })
})
