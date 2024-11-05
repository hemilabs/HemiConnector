import { ValueObject } from '../base/ValueObject'
import { InvalidAddressError } from '../errors/InvalidAddressError'

interface AddressProps {
  value: string
}

const addressRegex = /^0x[a-fA-F0-9]{40}$/

export class Address extends ValueObject<AddressProps> {
  private constructor(address: string) {
    super({ value: address })
  }

  static create(address: string): Address {
    if (typeof address !== 'string' ||
        !addressRegex.test(address)) {
      throw new InvalidAddressError()
    }

    return new Address(address)
  }

  get value(): string {
    return this.props.value
  }
}
