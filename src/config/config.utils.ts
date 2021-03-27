import Joi from '@hapi/joi'
import { Logger } from '@nestjs/common'

const requiredStringSchema = Joi.string().required()

const schema = Joi.object({
  MYSQL_DATABASE: requiredStringSchema,
  MYSQL_USERNAME: requiredStringSchema,
  MYSQL_PASSWORD: requiredStringSchema,
  MYSQL_PORT: requiredStringSchema,
  MYSQL_HOST: requiredStringSchema,
  MYSQL_DEBUG: requiredStringSchema,
  SERVER_HOST: requiredStringSchema,
  SERVER_PORT: requiredStringSchema,
  JWT_SECRET: requiredStringSchema,
  FIREBASE_SERVICE_ACCOUNT_JSON: requiredStringSchema,
  GRAPHQL_PLAYGROUND: requiredStringSchema,
  GRAPHQL_ENDPOINT: requiredStringSchema,
}).unknown(true)

export const validateEnvFile = () => {
  const validation = schema.validate(process.env, { abortEarly: false })
  if (!validation.error) return
  validation.error.details.forEach(({ message }) => Logger.error(`[ENV Error]: ${message}`))
  throw new Error('INVALID ENV FILE')
}
