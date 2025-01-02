import { File } from '../entities/File'

export interface FileRepository {
  save: (file: File) => Promise<void>
}
