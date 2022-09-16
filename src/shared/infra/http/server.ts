import "reflect-metadata";

import express, { json } from "express";
import swaggerUi from "swagger-ui-express";

// swagger
import swaggerFile from "../../../swagger.json";
// typeorm
import createConnection from "../typeorm";
// errors
import { errorHandler } from "./middlewares/errorHandler";
import "express-async-errors";
// routes
import { routes } from "./routes";
// tsyringe container
import "../../container";

createConnection().catch((error) => console.log(error));
const port = 3333;
const app = express();

app.use(json());

app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port: ${port} 🚀🚀🚀`)
);
