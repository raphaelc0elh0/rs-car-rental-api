import { Router } from 'express'
import multer from 'multer'
import { createCategoryController } from '../modules/cars/useCases/categories/createCategory'
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/categories/listCategories'

const categoriesRoutes = Router()
const upload = multer({
  dest: './tmp'
})

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response)
})

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController().handle(request, response)
})

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response)
})

export { categoriesRoutes }