import { DomainError } from '../base/DomainError'

export class InvalidMetricError extends DomainError {
  constructor() {
    super('INVALID_METRIC', true)
  }
}
