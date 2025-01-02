import { describe, it, expect } from 'vitest'
import { Entity } from './Entity'
import { ValueObject } from './ValueObject'
import { Uuid } from '../valueObjects/Uuid'

interface TestProps {
  value: string
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps, id: Uuid): TestEntity {
    return new TestEntity(props, id)
  }

  get value(): string {
    return this.props.value
  }
}

const id = Uuid.create()

describe('src/domain/Entity', () => {
  it('should be instance of ValueObject', () => {
    const entity = TestEntity.create({ value: 'test' }, id)

    expect(entity).toBeInstanceOf(ValueObject)
  })

  it('should generate a new id if none is passed to constructor', () => {
    const entity = TestEntity.create({ value: 'test' }, id)

    expect(entity.id).toBeDefined()
  })

  it('should set the id if it was passed to constructor', () => {
    const expectedId = id
    const entity = TestEntity.create({ value: 'test' }, expectedId)

    expect(entity.id).toBe(expectedId)
  })
})
