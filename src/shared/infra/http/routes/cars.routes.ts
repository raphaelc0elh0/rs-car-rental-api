import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar/CreateCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post("/cars", createCarController.handle);

export { carsRoutes };
