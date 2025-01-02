import { Entity } from '../base/Entity'
import { FileContent } from '../valueObjects/FileContent'
import { Filename } from '../valueObjects/Filename'
import { Uuid } from '../valueObjects/Uuid'

interface FileProps {
  name: Filename
  content: FileContent
}

export class File extends Entity<FileProps> {
  private constructor(props: FileProps) {
    super(props, Uuid.create())
  }

  static create(props: FileProps): File {
    return new File(props)
  }

  get name(): string {
    return this.props.name.value
  }

  get content(): string {
    return this.props.content.value
  }
}
