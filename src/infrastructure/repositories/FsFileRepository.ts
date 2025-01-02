import path from 'path'
import { promises as fs } from 'fs'
import { FileRepository } from '../../domain/repositories/FileRepository'
import { File } from '../../domain/entities/File'

export class FsFileRepository implements FileRepository {
  private readonly folderPath: string

  constructor() {
    this.folderPath = process.env['METRICS_FOLDER_PATH'] ?? ''
  }

  async save(file: File): Promise<void> {
    const { name, content } = file

    return await fs.writeFile(
      path.join(this.folderPath, name),
      content
    )
  }
}
