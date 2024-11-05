import { Hash } from '../valueObjects/Hash'
import { Entity } from '../base/Entity'
import { Transaction } from './Transaction'
import { BlockNumber } from '../valueObjects/BlockNumber'

interface BlockProps {
  blockNumber: BlockNumber
  transactions: Array<Transaction>
}

export class Block extends Entity<BlockProps> {
  private constructor(props: BlockProps, hash: Hash) {
    super(props, hash)
  }

  static create(props: BlockProps, hash: Hash): Block {
    return new Block(props, hash)
  }

  get transactions(): Array<Transaction> {
    return this.props.transactions
  }
}
