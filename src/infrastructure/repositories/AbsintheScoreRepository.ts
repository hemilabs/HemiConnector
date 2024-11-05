import { Score } from '../../domain/entities/Score';
import { ScoreRepository } from '../../domain/repositories/ScoreRepository';

export class AbsintheScoreRepository implements ScoreRepository {
  url: string
  headers: Headers
  eventName: string

  constructor() {
    this.headers = new Headers()

    this.headers.append(
      'Authorization',
      `Bearer ${process.env['ABSINTHE_API_KEY']}`
    )

    this.headers.append('Content-Type', 'application/json')
    this.url = process.env['ABSINTHE_API_URL'] || ''
    this.eventName =  process.env['ABSINTHE_EVENT_NAME'] || ''
  }

  async givePoints(score: Score): Promise<void> {
    const graphql = JSON.stringify({
      query: `mutation IssueOffChainPoints {
        insert_api_points_one(object: {account_id: ${score.address.value}, identity_type: EVM_ADDRESS, amount: ${score.amount}, metadata: {transaction: ${score.hash.value}}}) {
          id
          amount
          added_by
          event_name
        }
      }`
    })

    await fetch(this.url, {
      body: graphql,
      headers: this.headers,
      method: "POST",
    })
  }
}
