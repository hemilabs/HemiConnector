import { File } from '../../domain/entities/File'
import { ChainMetricsRepository } from '../../domain/repositories/ChainMetricsRepository'
import { FileRepository } from '../../domain/repositories/FileRepository'
import { FileContent } from '../../domain/valueObjects/FileContent'
import { Filename } from '../../domain/valueObjects/Filename'

export class CollectChainMetricsUsecase {
  private readonly chainMetricsRepository: ChainMetricsRepository
  private readonly fileRepository: FileRepository

  constructor(
    chainMetricsRepository: ChainMetricsRepository,
    fileRepository: FileRepository
  ) {
    this.chainMetricsRepository = chainMetricsRepository
    this.fileRepository = fileRepository
  }

  async execute(): Promise<void> {
    console.info(`Hemi Connector | Collecting chain metrics...`)

    const metrics = await this.chainMetricsRepository.collect()

    console.info(`Hemi Connector | Creating metrics.json file`)
    
    const file = this.createFile(metrics.toString())

    await this.fileRepository.save(file)

    console.info(`Hemi Connector | Metrics file created with success!`)
  }

  private createFile(content: string): File {
    return File.create({
      name: Filename.create('metrics.json'),
      content: FileContent.create(content)
    })
  }
}
