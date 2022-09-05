import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from 'tsyringe'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)
    try {
      await createUserUseCase.execute({ name, password, email, driver_license })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }

    return response.status(201).send()
  }
}

export { CreateUserController }