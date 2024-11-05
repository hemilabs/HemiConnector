import { Hash } from '../valueObjects/Hash'
import { ValueObject } from "./ValueObject"

export class Entity<T> extends ValueObject<T> {
  hash: Hash

  protected constructor(props: T, hash: Hash) {
    super(props)
    this.hash = hash
  }
}
