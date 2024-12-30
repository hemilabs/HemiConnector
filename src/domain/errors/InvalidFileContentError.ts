import { DomainError } from '../base/DomainError'

export class InvalidFileContentError extends DomainError {
  constructor() {
    super('INVALID_FILE_CONTENT', true)
  }
}
