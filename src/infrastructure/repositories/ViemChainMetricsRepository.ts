import {
  createPublicClient,
  http,
  PublicClient
} from 'viem'
import { hemiSepolia, hemi } from 'hemi-viem'
import {
  ChainMetricsRepository
} from '../../domain/repositories/ChainMetricsRepository'
import { ChainMetrics } from '../../domain/entities/ChainMetrics'
import { BlockNumber } from '../../domain/valueObjects/BlockNumber'
import { Metric } from '../../domain/valueObjects/Metric'

export class ViemChainMetricsRepository implements ChainMetricsRepository {
  private readonly client: PublicClient
  private readonly blockExplorerUrl: string

  constructor() {
    const chain = process.env['TESTNET'] ? hemiSepolia : hemi

    // @ts-expect-error
    // TS don't recognize PublicClient type as createPublicClient return type
    this.client = createPublicClient({ chain, transport: http() })
    this.blockExplorerUrl = chain.blockExplorers.default.url
  }

  async collect(): Promise<ChainMetrics> {
    const [blockNumber, stats] = await Promise.all([
      this.client.getBlockNumber(),
      fetch(
        `${this.blockExplorerUrl}/api/v2/stats`)
        .then(async response => await response.json())
    ])

    const totalTransactions = parseInt(stats.total_transactions)

    return ChainMetrics.create({
      latestKeystoneMined: BlockNumber.create(blockNumber),
      btcSecuredTransactions: Metric.create(totalTransactions)
    })
  }
}
