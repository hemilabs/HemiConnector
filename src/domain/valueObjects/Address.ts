import { isAddress } from 'viem'
import { ValueObject } from '../base/ValueObject'
import { InvalidAddressError } from '../errors/InvalidAddressError'

interface AddressProps {
  value: string
}

export class Address extends ValueObject<AddressProps> {
  private constructor(address: string) {
    super({ value: address })
  }

  static create(address: string): Address {
    if (typeof address !== 'string' ||
        !isAddress(address)) {
      throw new InvalidAddressError()
    }

    return new Address(address)
  }

  get value(): string {
    return this.props.value
  }
}
