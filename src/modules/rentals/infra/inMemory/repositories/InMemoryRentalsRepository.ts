import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../../typeorm/entities/Rental";

class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, { ...data, start_date: new Date() });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = this.rentals.filter((rental) => rental.user_id === user_id);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
    return rental;
  }
}

export { InMemoryRentalsRepository };
