import { DomainError } from '../base/DomainError'

export class InvalidFilenameError extends DomainError {
  constructor() {
    super('INVALID_FILE_NAME', true)
  }
}
