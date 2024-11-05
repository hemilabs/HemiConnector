import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidBlockNumberError } from './InvalidBlockNumberError'

describe('src/domain/errors/InvalidBlockNumberError', () => {
  it('should be defined', () => {
    expect(InvalidBlockNumberError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidBlockNumberError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_BLOCK_NUMBER', () => {
      const error = new InvalidBlockNumberError()

      expect(error.toObject().code).toBe('INVALID_BLOCK_NUMBER')
    })

    it('should set exposable to true', () => {
      const error = new InvalidBlockNumberError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
