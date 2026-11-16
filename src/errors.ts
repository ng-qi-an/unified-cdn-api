export abstract class APIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'APIError'
  }
}

export class UnauthorisedError extends APIError  {
    constructor(message: string) {
        super(message)
        this.name = 'UnauthorisedError'
    }
}

export class NotFoundError extends APIError  {
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class InsufficientPermissionsError extends APIError  {
    constructor(message: string) {
        super(message)
        this.name = 'InsufficientPermissionsError'
    }
}

export class InvalidConfigurationError extends APIError  {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidConfigurationError'
    }
}

export class UnknownError extends APIError  {
    constructor(message: string) {
        super(message)
        this.name = 'UnknownError'
    }
}