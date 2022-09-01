import { Router } from 'express'
import { MemoryCategoriesRepository } from '../repositories/implementations/MemoryCategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoriesRepository = new MemoryCategoriesRepository()

categoriesRoutes.get('/', (request, response) => {
  const allCategories = categoriesRepository.list()

  return response.status(200).json(allCategories)
})

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  try {
    createCategoryService.execute({ name, description })
  } catch (error) {
    response.status(400).json({ error: error.message })
  }

  return response.status(201).send()
})

export { categoriesRoutes }