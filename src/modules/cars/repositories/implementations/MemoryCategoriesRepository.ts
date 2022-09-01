import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class MemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: MemoryCategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): MemoryCategoriesRepository {
    if (!MemoryCategoriesRepository.INSTANCE) {
      MemoryCategoriesRepository.INSTANCE = new MemoryCategoriesRepository()
    }
    return MemoryCategoriesRepository.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    Object.assign(category, { name, description, created_at: new Date() })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string) {
    return this.categories.find(category => category.name === name)
  }
}

export { MemoryCategoriesRepository }