import { InMemoryCarsRepository } from "../../../infra/inMemory/repositories/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

const mockedCar = {
  name: "Name Car",
  description: "Description Car",
  daily_rate: 100,
  license_plate: "LIST-1234",
  fine_amount: 60,
  brand: "Brand Car",
  category_id: "category_id",
};

describe("ListAvailableCarsUseCase", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create(mockedCar);

    const cars = await listAvailableCarsUseCase.execute();
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      ...mockedCar,
      name: "Name Car",
      license_plate: "LIST-1234",
    });
    const car2 = await inMemoryCarsRepository.create({
      ...mockedCar,
      name: "Name Car2",
      license_plate: "LIST-2345",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Name Car" });
    expect(cars).toContain(car);
    expect(cars).not.toContain(car2);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await inMemoryCarsRepository.create({
      ...mockedCar,
      category_id: "category_id",
      license_plate: "LIST-1234",
    });
    const car2 = await inMemoryCarsRepository.create({
      ...mockedCar,
      category_id: "category_id2",
      license_plate: "LIST-2345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });
    expect(cars).toContain(car);
    expect(cars).not.toContain(car2);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      ...mockedCar,
      brand: "Brand Car",
      license_plate: "LIST-1234",
    });
    const car2 = await inMemoryCarsRepository.create({
      ...mockedCar,
      brand: "Brand Car2",
      license_plate: "LIST-2345",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Brand Car" });
    expect(cars).toContain(car);
    expect(cars).not.toContain(car2);
  });
});
