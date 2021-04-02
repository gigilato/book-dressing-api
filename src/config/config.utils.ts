import Joi from '@hapi/joi'
import { Logger } from '@nestjs/common'

const requiredStringSchema = Joi.string().required()

const schema = Joi.object({
  DATABASE_URL: requiredStringSchema,
  SERVER_HOST: requiredStringSchema,
  SERVER_PORT: requiredStringSchema,
  FIREBASE_SERVICE_ACCOUNT_JSON: requiredStringSchema,
  FIREBASE_CREDENTIAL: requiredStringSchema,
  GRAPHQL_PLAYGROUND: requiredStringSchema,
  ADMIN_USER: requiredStringSchema,
  ADMIN_PASSWORD: requiredStringSchema,
}).unknown(true)

export const validateEnvFile = () => {
  const validation = schema.validate(process.env, { abortEarly: false })
  if (!validation.error) return
  validation.error.details.forEach(({ message }) => Logger.error(`[ENV Error]: ${message}`))
  throw new Error('INVALID ENV FILE')
}
