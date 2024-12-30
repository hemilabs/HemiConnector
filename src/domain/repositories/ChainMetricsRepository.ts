import { ChainMetrics } from '../entities/ChainMetrics'

export interface ChainMetricsRepository {
  collect(): Promise<ChainMetrics>
}
