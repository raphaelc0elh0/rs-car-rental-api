import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/cars/listAvailableCars/ListAvailableCarsController";
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

export { carsRoutes };
