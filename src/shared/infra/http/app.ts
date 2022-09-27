import "dotenv/config";
import "reflect-metadata";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
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

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(rateLimiter);
app.use(json());

app.use(routes);
app.use("/avatar", express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use("/cars", express.static(`${uploadConfig.tmpFolder}/cars`));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

export { app };
