import { Block } from '../entities/Block'
import { TransactionReceipt } from '../entities/TransactionReceipt'
import { Address } from '../valueObjects/Address'
import { BlockNumber } from '../valueObjects/BlockNumber'
import { Hash } from '../valueObjects/Hash'

export interface ChainRepository {
  getBlockNumber(): Promise<BlockNumber>
  getBlock(blockNumber: BlockNumber, includeTransactions: boolean): Promise<Block | null>
  getTransactionReceipt(transactionHash: Hash): Promise<TransactionReceipt | null>
  callContractMethod(
    address: Address,
    methodName: string,
    abi: unknown, 
    ...inputs: any[]
  ): Promise<unknown>
}
