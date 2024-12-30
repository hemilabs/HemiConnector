import {
  CollectChainMetricsUsecase
} from '../../application/CollectChainMetrics/CollectChainMetricsUsecase'
import {
  FsFileRepository
} from '../../infrastructure/repositories/FsFileRepository'
import {
  ViemChainMetricsRepository
} from '../../infrastructure/repositories/ViemChainMetricsRepository'

const chainMetricsRepository = new ViemChainMetricsRepository()
const fileRepository = new FsFileRepository()

const collectChainMetricsUsecase = new CollectChainMetricsUsecase(
  chainMetricsRepository,
  fileRepository
)

collectChainMetricsUsecase.execute()
