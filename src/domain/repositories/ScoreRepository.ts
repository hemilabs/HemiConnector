import { Score } from '../entities/Score'

export interface ScoreRepository {
  givePoints(score: Score): Promise<void>
}
