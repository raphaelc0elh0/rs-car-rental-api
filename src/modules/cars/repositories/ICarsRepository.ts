import { ICreateCarDTO } from "../dtos/cars/ICreateCarDTO";
import { IFindAvailableDTO } from "../dtos/cars/IFindAvailableDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  changeAvailable(id: string, available: boolean): Promise<void>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data?: IFindAvailableDTO): Promise<Car[]>;
}

export { ICarsRepository };
