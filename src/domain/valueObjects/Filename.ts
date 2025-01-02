import { ValueObject } from '../base/ValueObject'
import { InvalidFilenameError } from '../errors/InvalidFilenameError'

interface FilenameProps {
  value: string
}

const filenameRegex = /^[^.][A-Za-z0-9\-\\_\\.]+[^.]$/

export class Filename extends ValueObject<FilenameProps> {
  private constructor(filename: string) {
    super({ value: filename })
  }

  static create(filename: string): Filename {
    if (typeof filename !== 'string' ||
        !filenameRegex.test(filename)) {
      throw new InvalidFilenameError()
    }

    return new Filename(filename)
  }

  get value(): string {
    return this.props.value
  }
}
