export class ExistError extends Error {
  constructor(entityName: 'loan' | 'user' | 'book') {
    super(`${entityName.toUpperCase()}_EXISTS`)
    this.name = 'ExistError'
  }
}

export class NotFoundError extends Error {
  constructor(entityName: 'loan' | 'user' | 'book') {
    super(`${entityName.toUpperCase()}_NOT_FOUND`)
    this.name = 'NotFoundError'
  }
}
