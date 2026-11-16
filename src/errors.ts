export abstract class APIError extends Error {
  abstract readonly status_code: number

  constructor(message: string) {
    super(message)
    this.name = 'APIError'
  }
}

export class UnauthorisedError extends APIError  {
    readonly status_code = 401;
    constructor(message: string) {
        super(message)
        this.name = 'UnauthorisedError'
    }
}

export class NotFoundError extends APIError  {
    readonly status_code = 404
    constructor(message: string) {
        super(message)
        this.name = 'NotFoundError'
    }
}

export class InsufficientPermissionsError extends APIError  {
    readonly status_code = 403;
    constructor(message: string) {
        super(message)
        this.name = 'InsufficientPermissionsError'
    }
}

export class InvalidConfigurationError extends APIError  {
    readonly status_code = 400
    constructor(message: string) {
        super(message)
        this.name = 'InvalidConfigurationError'
    }
}

export class UnknownError extends APIError  {
    readonly status_code = 500
    constructor(message: string) {
        super(message)
        this.name = 'UnknownError'
    }
}