export class ExistError extends Error {
  constructor() {
    super('Entity-exists')
    this.name = 'ExistError'
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Entity-not-found')
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends Error {
  constructor() {
    super('Validation-error')
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ExpiredError extends Error {
  constructor() {
    super('Expired')
    this.name = 'ExpiredError'
  }
}
