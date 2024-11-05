import { Score } from '../../domain/entities/Score'
import { Transaction } from '../../domain/entities/Transaction'
import { ChainRepository } from '../../domain/repositories/ChainRepository'
import { ScoreRepository } from '../../domain/repositories/ScoreRepository'
import { Address } from '../../domain/valueObjects/Address'
import { BlockNumber } from '../../domain/valueObjects/BlockNumber'
import { HelloWorldAbi } from '../abi/HelloWorldAbi'
import {
  GivePointsToContractCreationDto
} from './GivePointsToContractCreationDto'

export class GivePointsToContractCreationUsecase {
  private readonly chainRepository: ChainRepository
  private readonly scoreRepository: ScoreRepository

  constructor(
    chainRepository: ChainRepository,
    scoreRepository: ScoreRepository
  ) {
    this.chainRepository = chainRepository
    this.scoreRepository = scoreRepository
  }

  async execute({
    hours
  }: GivePointsToContractCreationDto): Promise<void> {
    console.info(`Hemi Connector | Searching for smart contracts created on the last ${hours} hours`)

    const blockDiff = BigInt((hours * 60 * 60) / 12) // X hours worth of Hemi blocks
    const blockNumber = await this.chainRepository.getBlockNumber()
    const toBlock = blockNumber.value
    const fromBlock = toBlock - blockDiff

    for (let currentBlock = fromBlock; currentBlock <= toBlock; currentBlock += 1n) {
      console.info(`--------------------------------------------------------`)
      console.info(`Hemi Connector | Current block number: ${currentBlock}`)

      const contractCreationTxs =
        await this.getContractCreationTransactions(currentBlock)

      console.info(`Hemi Connector | ${contractCreationTxs.length} contract creation transactions found`)

      await this.checkTransactionsToEarnPoints(contractCreationTxs)      
    }
  }

  private async getContractCreationTransactions(
    currentBlock: bigint
  ): Promise<Transaction[]> {
    const currentBlockNumber = BlockNumber.create(currentBlock)
    const block =
      await this.chainRepository.getBlock(currentBlockNumber, true)

    if (block === null) {
      return []
    }

    return block.transactions.filter(t => t.to == null)
  }

  private async checkTransactionsToEarnPoints(
    transactions: Transaction[]
  ): Promise<void> {
    for (const transaction of transactions) {
      const receipt = 
        await this.chainRepository.getTransactionReceipt(transaction.hash)
      
      if (receipt && receipt.contractAddress) {
        const isHelloWorldContract =
          await this.validateHelloWorldContract(receipt.contractAddress)
  
        if (isHelloWorldContract) {
          console.info(`Hemi Connector | ${transaction.from.value} created a Hello World smart contract`)
          await this.givePointsToTransaction(transaction)
        }
      }
    }
  }

  private async validateHelloWorldContract(contractAddress: Address): Promise<boolean> {
    try {
      await this.chainRepository.callContractMethod(
        contractAddress,
        'getGreeting',
        HelloWorldAbi
      )
      return true
    }
    catch (error) {
      return false
    }
  }

  private async givePointsToTransaction(transaction: Transaction): Promise<void> {
    const amount = 500

    try {
      const score = Score.create({
        address: transaction.from,
        amount
      }, transaction.hash)
      
      await this.scoreRepository.givePoints(score)
      console.info(`Hemi Connector | ${transaction.from.value} received ${amount} points on Absinthe`)
    }
    catch (error) {
      console.error(`Hemi Connector | Error giving points to ${transaction.from.value}: ${error}`)
    }
  }
}
