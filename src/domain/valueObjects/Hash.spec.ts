import { describe, it, expect } from 'vitest'
import { Hash } from './Hash'
import { ValueObject } from '../base/ValueObject'
import { InvalidHashError } from '../errors/InvalidHashError'

describe('src/domain/valueObjects/Hash', () => {
  const validHash =
    '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'

  it('should be defined', () => {
    expect(Hash).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const hash = Hash.create(validHash)

    expect(hash).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the hash is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        Hash.create(123)
      }

      expect(test).toThrowError(InvalidHashError)
    })

    it('should throw an error if the hash is not a valid', () => {
      const test = (): void => {
        Hash.create('not-a-valid-hash')
      }

      expect(test).toThrowError(InvalidHashError)
    })

    it('should return a new Hash instance if the hash is valid', () => {
      const hash = Hash.create(validHash)

      expect(hash).toBeInstanceOf(Hash)
    })

    it('should set the hash in the value property', () => {
      const expectedHash = validHash
      const hash = Hash.create(expectedHash)

      expect(hash.value).toBe(expectedHash)
    })
  })
})
