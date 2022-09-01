import { Router } from 'express'
import { createCategoryController } from '../modules/cars/useCases/categories/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/categories/listCategories'

const categoriesRoutes = Router()

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

export { categoriesRoutes }