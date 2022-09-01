import { MemoryCategoriesRepository } from "../../../repositories/implementations/MemoryCategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = MemoryCategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }