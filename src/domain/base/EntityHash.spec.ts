import { describe, it, expect } from "vitest"
import { EntityHash } from "./EntityHash"
import { ValueObject } from "./ValueObject"
import { Hash } from '../valueObjects/Hash'

interface TestProps {
  value: string
}

class TestEntityHash extends EntityHash<TestProps> {
  static create(props: TestProps, hash: Hash): TestEntityHash {
    return new TestEntityHash(props, hash)
  }

  get value(): string {
    return this.props.value
  }
}

const hash = Hash.create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')

describe("src/domain/EntityHash", () => {
  it("should be defined", () => {
    expect(EntityHash).toBeDefined()
  })

  it("should be instance of ValueObject", () => {
    const entity = TestEntityHash.create({ value: "test" }, hash)

    expect(entity).toBeInstanceOf(ValueObject)
  })

  it("should generate a new hash if none is passed to constructor", () => {
    const entity = TestEntityHash.create({ value: "test" }, hash)

    expect(entity.hash).toBeDefined()
  })

  it("should set the hash if it was passed to constructor", () => {
    const expectedId = hash
    const entity = TestEntityHash.create({ value: "test" }, expectedId)

    expect(entity.hash).toBe(expectedId)
  })
})