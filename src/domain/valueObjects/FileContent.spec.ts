import { describe, it, expect } from 'vitest'
import { FileContent } from './FileContent'
import { ValueObject } from '../base/ValueObject'
import { InvalidFileContentError } from '../errors/InvalidFileContentError'

describe('src/domain/valueObjects/FileContent', () => {
  const validFileContent = JSON.stringify({
    test: 'value'
  })

  it('should be defined', () => {
    expect(FileContent).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const content = FileContent.create(validFileContent)

    expect(content).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the content is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        FileContent.create(123)
      }

      expect(test).toThrowError(InvalidFileContentError)
    })

    it('should throw an error if the content length is zero', () => {
      const test = (): void => {
        FileContent.create('')
      }

      expect(test).toThrowError(InvalidFileContentError)
    })

    it('should return a new FileContent instance if the content is valid', () => {
      const content = FileContent.create(validFileContent)

      expect(content).toBeInstanceOf(FileContent)
    })

    it('should set the content in the value property', () => {
      const expectedFileContent = validFileContent
      const content = FileContent.create(expectedFileContent)

      expect(content.value).toBe(expectedFileContent)
    })
  })
})
