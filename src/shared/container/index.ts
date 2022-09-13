import { container } from "tsyringe";

import { PostgresUsersRepository } from "../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { PostgresCarsRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresCarsRepository";
import { PostgresCategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresSpecificationsRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// IUsersRepository
container.registerSingleton<IUsersRepository>(
  "PostgresUsersRepository",
  PostgresUsersRepository
);

// ICarsRepository
container.registerSingleton<ICarsRepository>(
  "PostgresCarsRepository",
  PostgresCarsRepository
);

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "PostgresCategoriesRepository",
  PostgresCategoriesRepository
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  "PostgresSpecificationsRepository",
  PostgresSpecificationsRepository
);
