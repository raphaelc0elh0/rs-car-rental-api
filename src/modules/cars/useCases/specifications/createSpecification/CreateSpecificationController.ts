import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from 'tsyringe'

class CreateSpecificationController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    try {
      createSpecificationUseCase.execute({ name, description })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }

    return response.status(201).send()
  }
}

export { CreateSpecificationController }