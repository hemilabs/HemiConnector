import { ValueObject } from '../base/ValueObject'
import { InvalidFileContentError } from '../errors/InvalidFileContentError'

interface FileContentProps {
  value: string
}

export class FileContent extends ValueObject<FileContentProps> {
  private constructor(content: string) {
    super({ value: content })
  }

  static create(content: string): FileContent {
    if (typeof content !== 'string' || content.length <= 0) {
      throw new InvalidFileContentError()
    }

    return new FileContent(content)
  }

  get value(): string {
    return this.props.value
  }
}
