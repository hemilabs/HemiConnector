import { Address } from '../valueObjects/Address'
import { Entity } from '../base/Entity'
import { Hash } from '../valueObjects/Hash'

interface TransactionReceiptProps {
  contractAddress?: Address
}

export class TransactionReceipt extends Entity<TransactionReceiptProps> {
  private constructor(props: TransactionReceiptProps, hash: Hash) {
    super(props, hash)
  }

  static create(
    props: TransactionReceiptProps,
    hash: Hash
  ): TransactionReceipt {
    return new TransactionReceipt(props, hash)
  }

  get contractAddress(): Address | undefined {
    return this.props.contractAddress
  }
}
