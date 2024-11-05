import { describe, it, expect } from 'vitest'
import { InvalidAddressError } from './InvalidAddressError'
import { DomainError } from '../base/DomainError'

describe('src/domain/errors/InvalidAddressError', () => {
  it('should be defined', () => {
    expect(InvalidAddressError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidAddressError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_ADDRESS', () => {
      const error = new InvalidAddressError()

      expect(error.toObject().code).toBe('INVALID_ADDRESS')
    })

    it('should set exposable to true', () => {
      const error = new InvalidAddressError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
