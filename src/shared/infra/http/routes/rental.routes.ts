import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/rentals/createRental/CreateRentalController";
import { ReturnRentalController } from "../../../../modules/rentals/useCases/rentals/returnRental/ReturnRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post(
  "/rentals",
  ensureAuthenticated,
  createRentalController.handle
);

const returnRentalController = new ReturnRentalController();
rentalRoutes.post(
  "/rentals/return/:id",
  ensureAuthenticated,
  returnRentalController.handle
);

export { rentalRoutes };
