import { container } from 'tsyringe'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { MemorySpecificationsRepository } from '../../modules/cars/repositories/implementations/MemorySpecificationsRepository'
import { PostgresCategoriesRepository } from '../../modules/cars/repositories/implementations/PostgresCategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("PostgresCategoriesRepository", PostgresCategoriesRepository)

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>("MemorySpecificationsRepository", MemorySpecificationsRepository)