import fs from 'fs'
import { parse as csvParse } from 'csv-parse'
import { ICategoriesRepository } from '../../../repositories/ICategoriesRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  file: Express.Multer.File
}

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("PostgresCategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const categories: IImportCategory[] = []

      const parseFile = csvParse()
      stream.pipe(parseFile)

      parseFile.on('data', async (line) => {
        const [name, description] = line
        categories.push({ name, description })
      }).on('end', () => {
        fs.promises.unlink(file.path)
        resolve(categories)
      }).on('error', (error) => {
        reject(error)
      })
    })
  }

  async execute({ file }: IRequest): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      const existCategory = await this.categoriesRepository.findByName(name)
      if (!existCategory) {
        await this.categoriesRepository.create({
          name, description
        })
      }
    })

    console.log(categories)
  }
}

export { ImportCategoryUseCase }