import { ChainRepository } from '../../domain/repositories/ChainRepository'
import {
  createPublicClient,
  http,
  PublicClient,
  Block as ViemBlock,
  Transaction as ViemTransaction,
  TransactionReceipt as ViemTransactionReceipt,
} from "viem"
// @ts-ignore
import { hemiSepolia, hemi } from "hemi-viem"
// @ts-ignore
import { Hash } from '../../domain/valueObjects/Hash'
import { Address } from '../../domain/valueObjects/Address'
import { Transaction } from '../../domain/entities/Transaction'
import { BlockNumber } from '../../domain/valueObjects/BlockNumber'
import { Block } from '../../domain/entities/Block'
import { TransactionReceipt } from '../../domain/entities/TransactionReceipt'

export class ViemChainRepository implements ChainRepository {
  private client: PublicClient

  constructor() {
    const chain = !!process.env['TESTNET'] ? hemiSepolia : hemi
    // @ts-expect-error
    this.client = createPublicClient({ chain, transport: http() })
  }

  async getBlockNumber(): Promise<BlockNumber> {
    const blockNumber = await this.client.getBlockNumber()

    console.log(`VIEM blockNumber: ${blockNumber}`)
    return BlockNumber.create(blockNumber)
  }

  async getBlock(blockNumber: BlockNumber, includeTransactions: boolean): Promise<Block | null> {
    const block = await this.client.getBlock({
      blockNumber: blockNumber.value,
      includeTransactions
    })

    return this.getEntityFromBlock(block)
  }

  async getTransactionReceipt(transactionHash: Hash): Promise<TransactionReceipt | null> {
    const receipt = await this.client
      // @ts-ignore
      .getTransactionReceipt({ hash: transactionHash.value })


    if (receipt.contractAddress) {
      return this.getEntityFromTransactionReceipt(receipt)
    }

    return this.getEntityFromTransactionReceipt(receipt)
  }

  async callContractMethod(
    address: Address,
    methodName: string,
    abi: unknown, 
    ...inputs: any[]
  ): Promise<unknown> {
    return await this.client.readContract({
      // @ts-expect-error
      abi,
      // @ts-expect-error
      address: address.value,
      functionName: methodName,
      inputs
    })
  }

  async listContractCreationTransactionsByHour(hours: number): Promise<Transaction[]> {
    const result: Array<Transaction> = []
    const blockDiff = BigInt((hours * 60 * 60) / 12) // X hours worth of Hemi blocks
    const toBlock = await this.client.getBlockNumber()
    const fromBlock = toBlock - blockDiff

    for (let currentBlock = fromBlock; currentBlock <= toBlock; currentBlock += BigInt(1)) {
      const blockTransactions =
        await this.getContractCreationTransactionsByBlock(currentBlock)

      if (blockTransactions.length > 0) {
        const transactions = blockTransactions
          .map(t => this.getEntityFromTransaction(t))

        result.push(...transactions)
      }

    }

    return result
  }

  private async getContractCreationTransactionsByBlock(blockNumber: bigint) {
    const block = await this.client.getBlock({
      blockNumber,
      includeTransactions: true
    });

    return block.transactions.filter(t => t.to == null)
  }

  private getEntityFromBlock(block: ViemBlock): Block {
    let transactions: Transaction[] = []
    
    if (block.transactions.length > 0) {
      transactions = block.transactions
      // @ts-ignore
        .map(t => this.getEntityFromTransaction(t))
    }

    return Block.create({
      // @ts-ignore
      blockNumber: BlockNumber.create(block.number),
      transactions
    }, Hash.create(block.hash as string))
  }

  private getEntityFromTransaction(
    transaction: ViemTransaction
  ): Transaction {
    const to = transaction.to 
      ? Address.create(transaction.to as string)
      : undefined

    return Transaction.create({
      blockHash: Hash.create(transaction.blockHash as string),
      from: Address.create(transaction.from as string),
      to
    }, Hash.create(transaction.hash))
  }

  private getEntityFromTransactionReceipt(
    receipt: ViemTransactionReceipt
  ): TransactionReceipt {
    return TransactionReceipt.create({
      contractAddress: Address.create(receipt.contractAddress as string)
    }, Hash.create(receipt.transactionHash))
  }
} 
