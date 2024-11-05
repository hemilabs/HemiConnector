import { DomainError } from '../base/DomainError'

export class InvalidHashError extends DomainError {
  constructor() {
    super('INVALID_HASH', true)
  }
}
