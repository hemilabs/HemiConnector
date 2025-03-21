/* eslint-disable no-console */
import { promises as fs } from 'fs'
import {
  createPublicClient,
  http
} from 'viem'
import { hemiSepolia, hemi } from 'hemi-viem'

const chain = process.env['TESTNET'] ? hemiSepolia : hemi
const filePath = process.env['METRICS_FILE_PATH'] ?? ''

const client = createPublicClient({ chain, transport: http() })
const blockExplorerUrl = chain.blockExplorers.default.url

// eslint-disable-next-line arrow-body-style
const execute = async (): Promise<void> => {
  console.info('Hemi Connector | Collecting chain metrics...')

  try {
    const [blockNumber, stats] = await Promise.all([
      client.getBlockNumber(),
      fetch(
        `${blockExplorerUrl}/api/v2/stats`)
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        .then(response => response.json())
    ])

    const totalTransactions = parseInt(stats.total_transactions)
    const content = JSON.stringify({
      'btc-transactions': totalTransactions.toString(),
      'latest-keystone': blockNumber.toString(),
      timestamp: new Date().getTime()
    })

    console.info('Hemi Connector | Creating metrics file')

    await fs.writeFile(
      filePath,
      content
    )

    console.info(
      'Hemi Connector | Metrics file created with success:',
      filePath
    )
  } catch (error) {
    console.error('Hemi Connector | Error collecting chain metrics:', error)
  }
}

void execute()
