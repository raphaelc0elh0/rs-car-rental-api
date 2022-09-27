import "dotenv/config";
import "reflect-metadata";
import express, { json } from "express";
import swaggerUi from "swagger-ui-express";

import { uploadConfig } from "../../../config/uploadConfig";
import swaggerFile from "../../../swagger.json";
import createConnection from "../typeorm";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimiter } from "./middlewares/rateLimiter";
import "express-async-errors";
import { routes } from "./routes";
import "../../container";

createConnection().catch((error) => console.log(error));
const app = express();

app.use(rateLimiter);
app.use(json());

app.use(routes);
app.use("/avatar", express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use("/cars", express.static(`${uploadConfig.tmpFolder}/cars`));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

export { app };
