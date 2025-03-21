import { isHash } from 'viem'
import { ValueObject } from '../base/ValueObject'
import { InvalidHashError } from '../errors/InvalidHashError'

interface HashProps {
  value: string
}

export class Hash extends ValueObject<HashProps> {
  private constructor(hash: string) {
    super({ value: hash })
  }

  static create(hash: string): Hash {
    if (typeof hash !== 'string' ||
        !isHash(hash)) {
      throw new InvalidHashError()
    }

    return new Hash(hash)
  }

  get value(): string {
    return this.props.value
  }
}
