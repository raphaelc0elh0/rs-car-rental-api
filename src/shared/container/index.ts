import { container } from "tsyringe";

import { PostgresUsersRepository } from "../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUsersRepository";
import { PostgresUserTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/implementations/PostgresUserTokensRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../modules/accounts/repositories/IUserTokensRepository";
import { PostgresCarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresCarsImagesRepository";
import { PostgresCarsRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresCarsRepository";
import { PostgresCategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/implementations/PostgresSpecificationsRepository";
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { PostgresRentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/PostgresRentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";

import "./providers";

// UsersRepository
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  PostgresUsersRepository
);

// UsersRepository
container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  PostgresUserTokensRepository
);

// CarsRepository
container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  PostgresCarsRepository
);

// CarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  PostgresCarsImagesRepository
);

// CategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  PostgresCategoriesRepository
);

// SpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  PostgresSpecificationsRepository
);

// RentalsRepository
container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  PostgresRentalsRepository
);
