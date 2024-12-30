import { describe, it, expect } from 'vitest'
import { Filename } from './Filename'
import { ValueObject } from '../base/ValueObject'
import { InvalidFilenameError } from '../errors/InvalidFilenameError'

describe('src/domain/valueObjects/Filename', () => {
  const validFilename = 'metrics.json'

  it('should be defined', () => {
    expect(Filename).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const filename = Filename.create(validFilename)

    expect(filename).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the filename is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        Filename.create(123)
      }

      expect(test).toThrowError(InvalidFilenameError)
    })

    it('should throw an error if the filename is not a valid', () => {
      const test = (): void => {
        Filename.create('not-a-valid-filename.')
      }

      expect(test).toThrowError(InvalidFilenameError)
    })

    it('should return a new Filename instance if the filename is valid', () => {
      const filename = Filename.create(validFilename)

      expect(filename).toBeInstanceOf(Filename)
    })

    it('should set the filename in the value property', () => {
      const expectedFilename = validFilename
      const filename = Filename.create(expectedFilename)

      expect(filename.value).toBe(expectedFilename)
    })
  })
})
