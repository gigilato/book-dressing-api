export class ExistError extends Error {
  constructor() {
    super(`ENTITY_EXISTS`)
    this.name = 'ExistError'
  }
}

export class NotFoundError extends Error {
  constructor() {
    super(`ENTITY_NOT_FOUND`)
    this.name = 'NotFoundError'
  }
}
