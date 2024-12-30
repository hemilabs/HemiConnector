import {
  createPublicClient,
  http,
  PublicClient
} from "viem"
// @ts-ignore
import { hemiSepolia, hemi } from "hemi-viem"
// @ts-ignore
import { Hash } from '../../domain/valueObjects/Hash'
import { ChainMetricsRepository } from '../../domain/repositories/ChainMetricsRepository'
import { ChainMetrics } from '../../domain/entities/ChainMetrics'
import { BlockNumber } from '../../domain/valueObjects/BlockNumber'
import { Metric } from '../../domain/valueObjects/Metric'

export class ViemChainMetricsRepository implements ChainMetricsRepository {
  private client: PublicClient
  private blockExplorerUrl: string

  constructor() {
    const chain = !!process.env['TESTNET'] ? hemiSepolia : hemi
    
    // @ts-expect-error
    this.client = createPublicClient({ chain, transport: http() })
    this.blockExplorerUrl = process.env['BLOCK_EXPLORER_URL'] || ''
  }

  async collect(): Promise<ChainMetrics> {
    const blockNumber = await this.client.getBlockNumber()
    
    const response = await fetch(`${this.blockExplorerUrl}/api/v2/stats`)
    const stats = await response.json()
    const totalTransactions = parseInt(stats.total_transactions)

    return ChainMetrics.create({
      latestKeystoneMined: BlockNumber.create(blockNumber),
      btcSecuredTransactions: Metric.create(totalTransactions)
    })
  }
} 
