import { describe, it, expect } from 'vitest'
import { DomainError } from '../base/DomainError'
import { InvalidFileContentError } from './InvalidFileContentError'

describe('src/domain/errors/InvalidFileContentError', () => {
  it('should be defined', () => {
    expect(InvalidFileContentError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidFileContentError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_FILE_CONTENT', () => {
      const error = new InvalidFileContentError()

      expect(error.toObject().code).toBe('INVALID_FILE_CONTENT')
    })

    it('should set exposable to true', () => {
      const error = new InvalidFileContentError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})
