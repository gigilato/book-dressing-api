import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import axios from 'axios'

admin.initializeApp(functions.config().firebase)

const authUser = 'gigilato'
const authPassword = 'RpZTbvfmxXacJE54'
const basicKey = Buffer.from(`${authUser}:${authPassword}`).toString('base64')
const authorization = `Basic ${basicKey}`
const options = { headers: { authorization } }
const endpoint = 'http://localhost:3333/users'

export const onCreate = functions.auth.user().onCreate(async (user) => {
  await axios.post(
    endpoint,
    {
      email: user.email,
      firebaseId: user.uid,
    },
    options
  )
})

export const onDelete = functions.auth.user().onDelete(async (user) => {
  await axios.delete(`${endpoint}/${user.uid}`, options)
})
