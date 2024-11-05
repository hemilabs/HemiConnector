import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidHashError } from './InvalidHashError'

describe('src/domain/errors/InvalidHashError', () => {
  it('should be defined', () => {
    expect(InvalidHashError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidHashError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_HASH', () => {
      const error = new InvalidHashError()

      expect(error.toObject().code).toBe('INVALID_HASH')
    })

    it('should set exposable to true', () => {
      const error = new InvalidHashError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
