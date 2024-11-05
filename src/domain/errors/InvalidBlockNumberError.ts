import { DomainError } from '../base/DomainError'

export class InvalidBlockNumberError extends DomainError {
  constructor() {
    super('INVALID_BLOCK_NUMBER', true)
  }
}
