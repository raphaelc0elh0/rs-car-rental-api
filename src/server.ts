import "reflect-metadata"

import express, { json } from "express"
import { routes } from "./routes"

// typeorm
import './database'

import './shared/container'

// swagger
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const port = 3333
const app = express()

app.use(json())

app.use(routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => console.log(`Server is running on port: ${port} 🚀🚀🚀`))
