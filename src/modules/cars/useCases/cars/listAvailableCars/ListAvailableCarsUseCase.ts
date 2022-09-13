import { inject, injectable } from "tsyringe";

import { Car } from "../../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("PostgresCarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(data?: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(data);
    return cars;
  }
}

export { ListAvailableCarsUseCase };
