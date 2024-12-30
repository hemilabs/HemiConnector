import { Entity } from '../base/Entity'
import { BlockNumber } from '../valueObjects/BlockNumber'
import { Metric } from '../valueObjects/Metric'
import { Uuid } from '../valueObjects/Uuid'

interface ChainMetricsProps {
  btcSecuredTransactions: Metric
  latestKeystoneMined: BlockNumber
}

export class ChainMetrics extends Entity<ChainMetricsProps> {
  private constructor(props: ChainMetricsProps) {
    super(props, Uuid.create())
  }

  static create(props: ChainMetricsProps): ChainMetrics {
    return new ChainMetrics(props)
  }
  
  get btcSecuredTransactions(): number {
    return this.props.btcSecuredTransactions.value
  }

  get latestKeystoneMined(): bigint {
    return this.props.latestKeystoneMined.value
  }

  override toString(): string {
    return JSON.stringify({
      'btc-transactions': this.btcSecuredTransactions,
      'latest-keystone': this.latestKeystoneMined.toString()
    })
  }
}
