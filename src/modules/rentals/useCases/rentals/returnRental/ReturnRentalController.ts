import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnRentalUseCase } from "./ReturnRentalUseCase";

class ReturnRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const returnRentalUserCase = container.resolve(ReturnRentalUseCase);
    const rental = await returnRentalUserCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}

export { ReturnRentalController };
