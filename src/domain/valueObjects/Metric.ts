import { ValueObject } from '../base/ValueObject'
import { InvalidMetricError } from '../errors/InvalidMetricError'

interface MetricProps {
  value: number
}

export class Metric extends ValueObject<MetricProps> {
  private constructor(metric: number) {
    super({ value: metric })
  }

  static create(metric: number): Metric {
    if (typeof metric !== 'number' || metric < 0) {
      throw new InvalidMetricError()
    }

    return new Metric(metric)
  }

  get value(): number {
    return this.props.value
  }
}
