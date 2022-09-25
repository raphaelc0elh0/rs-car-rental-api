import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "../../../../config/uploadConfig";
import { CreateCarController } from "../../../../modules/cars/useCases/cars/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/cars/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/cars/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/cars/uploadCarImages/UploadCarImagesController";
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

const uploadCarImages = multer(uploadConfig);
const uploadCarImagesControler = new UploadCarImagesController();
carsRoutes.post(
  "/cars/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesControler.handle
);

export { carsRoutes };
