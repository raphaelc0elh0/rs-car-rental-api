import { MemoryCategoriesRepository } from "../../../repositories/implementations/MemoryCategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = MemoryCategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }