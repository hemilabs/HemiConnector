import { Address } from '../valueObjects/Address'
import { Entity } from '../base/Entity'
import { Hash } from '../valueObjects/Hash'

interface TransactionProps {
  blockHash: Hash
  from: Address
  to?: Address | undefined
}

export class Transaction extends Entity<TransactionProps> {
  private constructor(props: TransactionProps, hash: Hash) {
    super(props, hash)
  }

  static create(props: TransactionProps, hash: Hash): Transaction {
    return new Transaction(props, hash)
  }

  get from(): Address {
    return this.props.from
  }

  get to(): Address | undefined {
    return this.props.to
  }
}
