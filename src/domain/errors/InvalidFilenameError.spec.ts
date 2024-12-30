import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidFilenameError } from './InvalidFilenameError'

describe('src/domain/errors/InvalidFilenameError', () => {
  it('should be defined', () => {
    expect(InvalidFilenameError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidFilenameError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_FILE_NAME', () => {
      const error = new InvalidFilenameError()

      expect(error.toObject().code).toBe('INVALID_FILE_NAME')
    })

    it('should set exposable to true', () => {
      const error = new InvalidFilenameError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
