import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../../cars/repositories/ICarsRepository";
import { Rental } from "../../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exist!");
    }

    // get days difference (rented and exceeded)
    let daily = this.dateProvider.compareInDays(rental.start_date, new Date());

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      new Date(),
      rental.expected_return_date
    );

    // create total
    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }
    total += daily * car.daily_rate;

    // update rentals and car
    rental.end_date = new Date();
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.changeAvailable(car.id, true);

    return rental;
  }
}

export { ReturnRentalUseCase };
