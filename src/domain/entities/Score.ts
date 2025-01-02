import { Hash } from '../valueObjects/Hash'
import { EntityHash } from '../base/EntityHash'
import { Address } from '../valueObjects/Address'

interface ScoreProps {
  address: Address
  amount: number
}

export class Score extends EntityHash<ScoreProps> {
  private constructor(props: ScoreProps, hash: Hash) {
    super(props, hash)
  }

  static create(props: ScoreProps, hash: Hash): Score {
    return new Score(props, hash)
  }

  get address(): Address {
    return this.props.address
  }

  get amount(): number {
    return this.props.amount
  }
}
