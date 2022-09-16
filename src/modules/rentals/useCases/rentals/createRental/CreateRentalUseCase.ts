import dayjs from "dayjs";

import { AppError } from "../../../../../shared/errors/AppError";
import { Rental } from "../../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumExpectedReturnTimeDiff = 24; // hours

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) throw new AppError("Car is unavailable");

    const userAlreadyHasRental =
      await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (userAlreadyHasRental)
      throw new AppError("User already has a rental ongoing");

    const expectReturnDateFormatted = dayjs(expected_return_date).format();
    const dateNow = dayjs().format();
    const compare = dayjs(expectReturnDateFormatted).diff(dateNow, "hours");

    if (compare < minimumExpectedReturnTimeDiff)
      throw new AppError("Invalid return time");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
