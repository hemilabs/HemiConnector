import { Uuid } from '../valueObjects/Uuid'
import { ValueObject } from './ValueObject'

export class Entity<T> extends ValueObject<T> {
  id: Uuid

  protected constructor(props: T, id: Uuid) {
    super(props)
    this.id = id
  }
}
