import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/cars/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/shared/createCarSpecification/CreateCarSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
  "/cars",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get("/cars/available", listAvailableCarsController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carsRoutes.post(
  "/cars/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

export { carsRoutes };
