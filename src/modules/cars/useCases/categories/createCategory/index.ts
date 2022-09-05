import { PostgresCategoriesRepository } from "../../../repositories/implementations/PostgresCategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const createCategoryController = (): CreateCategoryController => {
  const categoriesRepository = new PostgresCategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  const createCategoryController = new CreateCategoryController(createCategoryUseCase)

  return createCategoryController
}

export { createCategoryController }