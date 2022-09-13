import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/specifications/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post(
  "/specifications",
  ensureAuthenticated,
  createSpecificationController.handle
);

export { specificationsRoutes };
