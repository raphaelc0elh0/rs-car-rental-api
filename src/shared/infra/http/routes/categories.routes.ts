import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/categories/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/categories/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/categories/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/categories", listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post(
  "/categories",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/categories/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
