import { describe, it, expect } from 'vitest'
import { BlockNumber } from './BlockNumber'
import { ValueObject } from '../base/ValueObject'
import { InvalidBlockNumberError } from '../errors/InvalidBlockNumberError'

describe('src/domain/valueObjects/BlockNumber', () => {
  const validBlockNumber = BigInt(1857202)

  it('should be an instance of ValueObject', () => {
    const blockNumber = BlockNumber.create(validBlockNumber)

    expect(blockNumber).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the blockNumber is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        BlockNumber.create(123)
      }

      expect(test).toThrowError(InvalidBlockNumberError)
    })

    it('should throw an error if the blockNumber is not a valid', () => {
      const test = (): void => {
        // @ts-expect-error
        BlockNumber.create('not-a-valid-blockNumber')
      }

      expect(test).toThrowError(InvalidBlockNumberError)
    })

    it('should return new BlockNumber instance if blockNumber is valid', () => {
      const blockNumber = BlockNumber.create(validBlockNumber)

      expect(blockNumber).toBeInstanceOf(BlockNumber)
    })

    it('should set the blockNumber in the value property', () => {
      const expectedBlockNumber = validBlockNumber
      const blockNumber = BlockNumber.create(expectedBlockNumber)

      expect(blockNumber.value).toBe(expectedBlockNumber)
    })
  })
})
