import { EntityManager, QueryOrderMap } from '@mikro-orm/core'
import { User } from '../modules/user/user.entity'

export type GqlContext = { req?: Request }
export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

export type ServiceMethodOptions = {
  em?: EntityManager
  populate?: any
  orderBy?: QueryOrderMap
  limit?: number
  offset?: number
}

export interface GqlRequestWithContext {
  req: {
    user: User
  } & Request
}
