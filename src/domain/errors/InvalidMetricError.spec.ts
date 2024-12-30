import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidMetricError } from './InvalidMetricError'

describe('src/domain/errors/InvalidMetricError', () => {
  it('should be defined', () => {
    expect(InvalidMetricError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidMetricError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_METRIC', () => {
      const error = new InvalidMetricError()

      expect(error.toObject().code).toBe('INVALID_METRIC')
    })

    it('should set exposable to true', () => {
      const error = new InvalidMetricError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
