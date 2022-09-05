import "reflect-metadata"

import express, { json } from "express"
import 'express-async-errors'
import { routes } from "./routes"

// typeorm
import './database'

// container
import './shared/container'

// swagger
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import { errorHandler } from "./middlewares/errorHandler"

const port = 3333
const app = express()

app.use(json())

app.use(routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port} 🚀🚀🚀`))
