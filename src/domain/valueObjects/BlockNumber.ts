import { ValueObject } from '../base/ValueObject'
import { InvalidBlockNumberError } from '../errors/InvalidBlockNumberError'

interface BlockNumberProps {
  value: bigint
}

export class BlockNumber extends ValueObject<BlockNumberProps> {
  private constructor(blockNumber: bigint) {
    super({ value: blockNumber })
  }

  static create(blockNumber: bigint): BlockNumber {
    if (typeof blockNumber !== 'bigint') {
      throw new InvalidBlockNumberError()
    }

    return new BlockNumber(blockNumber)
  }

  get value(): bigint {
    return this.props.value
  }
}
