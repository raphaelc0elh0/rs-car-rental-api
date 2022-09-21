import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../infra/inMemory/repositories/InMemoryCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });
  it("should be able to create a new car", async () => {
    const createdCar = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "category",
    });

    expect(createdCar).toHaveProperty("id");
  });

  it("should not be able to create a car with already existing license_plate", async () => {
    try {
      const carOne = {
        name: "Name Car1",
        description: "Description Car1",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand Car1",
        category_id: "category",
      };
      const carTwo = {
        name: "Name Car2",
        description: "Description Car2",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand Car2",
        category_id: "category",
      };
      await createCarUseCase.execute(carOne);
      await createCarUseCase.execute(carTwo);
    } catch (error) {
      expect(error).toEqual(new AppError("Car already exists!"));
    }
  });

  it("should be available true by default", async () => {
    const createdCar = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand Car",
      category_id: "category",
    });

    expect(createdCar.available).toBe(true);
  });
});
