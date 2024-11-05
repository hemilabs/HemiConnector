import { Hash } from '../valueObjects/Hash'
import { Entity } from '../base/Entity'
import { Address } from '../valueObjects/Address'

interface ScoreProps {
  address: Address
  amount: number
}

export class Score extends Entity<ScoreProps> {
  private constructor(props: ScoreProps, hash: Hash) {
    super(props, hash)
  }

  static create(props: ScoreProps, hash: Hash): Score {
    return new Score(props, hash)
  }
  
  get address(): Address {
    return this.address
  }

  get amount(): number {
    return this.amount
  }
}
