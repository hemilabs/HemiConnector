import { describe, it, expect } from 'vitest'
import { InvalidAddressError } from '../errors/InvalidAddressError'
import { Address } from './Address'
import { ValueObject } from '../base/ValueObject'

describe('src/domain/valueObjects/Address', () => {
  const validAddress = '0x52908400098527886E0F7030069857D2E4169EE7'

  it('should be defined', () => {
    expect(Address).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const address = Address.create(validAddress)

    expect(address).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the address is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        Address.create(123)
      }

      expect(test).toThrowError(InvalidAddressError)
    })

    it('should throw an error if the address is not a valid', () => {
      const test = (): void => {
        Address.create('not-a-valid-address')
      }

      expect(test).toThrowError(InvalidAddressError)
    })

    it('should return a new Address instance if the address is valid', () => {
      const address = Address.create(validAddress)

      expect(address).toBeInstanceOf(Address)
    })

    it('should set the address in the value property', () => {
      const expectedAddress = validAddress
      const address = Address.create(expectedAddress)

      expect(address.value).toBe(expectedAddress)
    })
  })
})
