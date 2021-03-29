import admin from 'firebase-admin'
import { v4 } from 'uuid'
import axios from 'axios'
import { Readable } from 'stream'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FirebaseConfig } from '@config'
import { createReadableStream } from '@utils/create-readable-stream'
import { FIREBASE_BUCKET_URL } from './firebase.constants'
import { FirebaseBucketDirectories } from './firebase.types'

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const { credential, storageBucket } = this.configService.get<FirebaseConfig>(
      'firebase'
    ) as FirebaseConfig

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: credential.project_id,
        clientEmail: credential.client_email,
        privateKey: credential.private_key,
      }),
      storageBucket,
    })
  }

  async authenticate(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      return decodedToken
    } catch (e) {
      return null
    }
  }

  async uploadStream(readStream: Readable, directory: FirebaseBucketDirectories, filename: string) {
    const bucket = admin.storage().bucket()
    const file = bucket.file(`${directory}/${filename}`)

    const firebaseStorageDownloadTokens = v4()

    const writeStream = file.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
        metadata: { firebaseStorageDownloadTokens },
      },
    })

    const result: Promise<string> = new Promise((resolve, reject) => {
      writeStream.on('error', (err) => {
        reject(err)
      })
      writeStream.on('finish', () => {
        const publicUrl = `${FIREBASE_BUCKET_URL}/${bucket.name}/o/${directory}%2f${filename}?alt=media&token=${firebaseStorageDownloadTokens}`
        resolve(publicUrl)
      })
    })

    readStream.pipe(writeStream)
    return result
  }

  uploadImageFromBuffer(buffer: Buffer, directory: FirebaseBucketDirectories, filename: string) {
    const readStream = createReadableStream(buffer)
    return this.uploadStream(readStream, directory, filename)
  }

  async uploadImageFromUrl(
    imageUrl: string,
    directory: FirebaseBucketDirectories,
    filename: string
  ): Promise<string> {
    const { data: readStream } = await axios.get(imageUrl, {
      responseType: 'stream',
    })
    return this.uploadStream(readStream, directory, filename)
  }
}
