import { ICreateCarDTO } from "../../dtos/cars/ICreateCarDTO";
import { IFindAvailableDTO } from "../../dtos/cars/IFindAvailableDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findAvailable(data?: IFindAvailableDTO): Promise<Car[]> {
    const cars = this.cars
      .filter((car) => !!car.available)
      .filter((car) => {
        if (data) {
          return (
            (data.brand && car.brand === data.brand) ||
            (data.category_id && car.category_id === data.category_id) ||
            (data.name && car.name === data.name)
          );
        }
        return true;
      });
    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
}

export { InMemoryCarsRepository };
