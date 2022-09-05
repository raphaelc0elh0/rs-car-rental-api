import { PostgresCategoriesRepository } from "../../../repositories/implementations/PostgresCategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const listCategoriesController = () => {
  const categoriesRepository = new PostgresCategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
  const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

  return listCategoriesController
}

export { listCategoriesController }