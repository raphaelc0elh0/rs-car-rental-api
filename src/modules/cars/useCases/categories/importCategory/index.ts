import { PostgresCategoriesRepository } from "../../../repositories/implementations/PostgresCategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryController = () => {
  const categoriesRepository = new PostgresCategoriesRepository()
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)
  const importCategoryController = new ImportCategoryController(importCategoryUseCase)

  return importCategoryController
}

export { importCategoryController }