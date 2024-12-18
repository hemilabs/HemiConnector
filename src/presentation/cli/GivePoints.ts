import { GivePointsToContractCreationUsecase } from '../../application/GivePointsToContractCreation/GivePointsToContractCreationUsecase'
import {
  AbsintheScoreRepository
} from '../../infrastructure/repositories/AbsintheScoreRepository'
import {
  ViemChainRepository
} from '../../infrastructure/repositories/ViemChainRepository'

const chainRepository = new ViemChainRepository()
const scoreRepository = new AbsintheScoreRepository()

const hours = parseInt(process.env['HOURS_INTERVAL'] || '')

const givePointsUsecase = new GivePointsToContractCreationUsecase(
  chainRepository,
  scoreRepository
)

givePointsUsecase.execute({ hours })
