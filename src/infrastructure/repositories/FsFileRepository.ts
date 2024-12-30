import path from 'path'
import { promises as fs } from 'fs'
import { FileRepository } from '../../domain/repositories/FileRepository'
import { File } from '../../domain/entities/File'

export class FsFileRepository implements FileRepository {
  private folderPath: string

  constructor() {
    this.folderPath = process.env['METRICS_FOLDER_PATH'] || ''
  }

  save(file: File): Promise<void> {
    const { name, content } = file

    return fs.writeFile(
      path.join(this.folderPath, name),
      content
    )
  }
}
