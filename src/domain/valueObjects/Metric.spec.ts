import { describe, it, expect } from 'vitest'
import { Metric } from './Metric'
import { ValueObject } from '../base/ValueObject'
import { InvalidMetricError } from '../errors/InvalidMetricError'

describe('src/domain/valueObjects/Metric', () => {
  const validMetric = 1857202

  it('should be defined', () => {
    expect(Metric).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const metric = Metric.create(validMetric)

    expect(metric).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the metric is not a number', () => {
      const test = (): void => {
        // @ts-expect-error
        Metric.create('invalid-metric')
      }

      expect(test).toThrowError(InvalidMetricError)
    })

    it('should throw an error if the metric is less than zero', () => {
      const test = (): void => {
        Metric.create(-12564)
      }

      expect(test).toThrowError(InvalidMetricError)
    })

    it('should return a new Metric instance if the metric is valid', () => {
      const metric = Metric.create(validMetric)

      expect(metric).toBeInstanceOf(Metric)
    })

    it('should set the metric in the value property', () => {
      const expectedMetric = validMetric
      const metric = Metric.create(expectedMetric)

      expect(metric.value).toBe(expectedMetric)
    })
  })
})
