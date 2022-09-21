import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../infra/inMemory/repositories/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "../../../infra/inMemory/repositories/InMemorySpecificationsRepository";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

const mockedCar = {
  name: "Name Car",
  description: "Description Car",
  daily_rate: 100,
  license_plate: "LIST-1234",
  fine_amount: 60,
  brand: "Brand Car",
  category_id: "category_id",
};

const mockedSpecification = {
  name: "Name Specification",
  description: "Description Specification",
};

describe("CreateCarSpecificationUseCase", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    );
  });

  it("should be able to add a new specification to car", async () => {
    const car = await inMemoryCarsRepository.create(mockedCar);
    const car_id = car.id;

    const specification = await inMemorySpecificationsRepository.create(
      mockedSpecification
    );
    const specifications_id = [specification.id];

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });
    expect(updatedCar).toHaveProperty("specifications");
    expect(updatedCar.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    try {
      await createCarSpecificationUseCase.execute({
        car_id: "car_id",
        specifications_id: ["specifications_id"],
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Car does not exist"));
    }
  });
});
