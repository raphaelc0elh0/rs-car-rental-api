import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryRentalsRepository } from "../../../infra/inMemory/repositories/InMemoryRentalsRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;

const mockedRentalInput = {
  user_id: "user_id",
  car_id: "car_id",
  expected_return_date: new Date(),
};

describe("createRentalUseCase", () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository);
  });

  it("should be able to create rental", async () => {
    const rental = await createRentalUseCase.execute(mockedRentalInput);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create rental when car is unavailable", async () => {
    try {
      await createRentalUseCase.execute({
        ...mockedRentalInput,
        car_id: "car_id",
        user_id: "user_id1",
      });
      await createRentalUseCase.execute({
        ...mockedRentalInput,
        car_id: "car_id",
        user_id: "user_id2",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should not be able to create rental when user has another rental ongoing", async () => {
    try {
      await createRentalUseCase.execute({
        ...mockedRentalInput,
        car_id: "car_id1",
        user_id: "user_id",
      });
      await createRentalUseCase.execute({
        ...mockedRentalInput,
        car_id: "car_id2",
        user_id: "user_id",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
