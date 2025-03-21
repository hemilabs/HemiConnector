import {
  GivePointsToContractCreationUsecase
  // eslint-disable-next-line max-len
} from '../../application/GivePointsToContractCreation/GivePointsToContractCreationUsecase'
import {
  AbsintheScoreRepository
} from '../../infrastructure/repositories/AbsintheScoreRepository'
import {
  ViemChainRepository
} from '../../infrastructure/repositories/ViemChainRepository'

const chainRepository = new ViemChainRepository()
const scoreRepository = new AbsintheScoreRepository()

const hours = parseInt(process.env['HOURS_INTERVAL'] ?? '')

const givePointsUsecase = new GivePointsToContractCreationUsecase(
  chainRepository,
  scoreRepository
)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
givePointsUsecase.execute({ hours })
