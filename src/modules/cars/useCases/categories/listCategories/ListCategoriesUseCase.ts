import { Category } from "../../../entities/Category"
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository"
import { inject, injectable } from 'tsyringe'

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("PostgresCategoriesRepositories")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list()
  }
}

export { ListCategoriesUseCase }