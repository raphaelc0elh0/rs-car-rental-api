import { container } from 'tsyringe'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { PostgresSpecificationsRepository } from '../../modules/cars/repositories/implementations/PostgresSpecificationsRepository'
import { PostgresCategoriesRepository } from '../../modules/cars/repositories/implementations/PostgresCategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { PostgresUsersRepository } from '../../modules/accounts/repositories/implementations/PostgresUsersRepository'

// IUsersRepository
container.registerSingleton<IUsersRepository>("PostgresUsersRepository", PostgresUsersRepository)

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("PostgresCategoriesRepository", PostgresCategoriesRepository)

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>("PostgresSpecificationsRepository", PostgresSpecificationsRepository)