import { describe, it, expect } from "vitest"
import { Entity } from "./Entity"
import { ValueObject } from "./ValueObject"
import { Hash } from '../valueObjects/Hash'

interface TestProps {
  value: string
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps, hash: Hash): TestEntity {
    return new TestEntity(props, hash)
  }

  get value(): string {
    return this.props.value
  }
}

const hash = Hash.create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')

describe("src/domain/Entity", () => {
  it("should be defined", () => {
    expect(Entity).toBeDefined()
  })

  it("should be instance of ValueObject", () => {
    const entity = TestEntity.create({ value: "test" }, hash)

    expect(entity).toBeInstanceOf(ValueObject)
  })

  it("should generate a new hash if none is passed to constructor", () => {
    const entity = TestEntity.create({ value: "test" }, hash)

    expect(entity.hash).toBeDefined()
  })

  it("should set the hash if it was passed to constructor", () => {
    const expectedId = hash
    const entity = TestEntity.create({ value: "test" }, expectedId)

    expect(entity.hash).toBe(expectedId)
  })
})
