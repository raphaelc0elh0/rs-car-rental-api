import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../../cars/infra/inMemory/repositories/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "../../../infra/inMemory/repositories/InMemoryRentalsRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemoryRentalsRepository: InMemoryRentalsRepository;
let dateProvider: DayjsDateProvider;

const mockedRentalInput = {
  user_id: "user_id",
  car_id: "car_id",
  expected_return_date: dayjs().add(1, "day").toDate(),
};

const mockedCar = {
  id: mockedRentalInput.car_id,
  name: "Car",
  description: "Car Description",
  daily_rate: 100,
  license_plate: "ABCD-1234",
  fine_amount: 10,
  brand: "Car Brand",
  category_id: "category_id",
};

describe("createRentalUseCase", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      inMemoryCarsRepository,
      dateProvider
    );
  });

  it("should be able to create rental", async () => {
    await inMemoryCarsRepository.create(mockedCar);
    const rental = await createRentalUseCase.execute(mockedRentalInput);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create rental when car is unavailable", async () => {
    try {
      await inMemoryCarsRepository.create(mockedCar);
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
      expect(error).toEqual(new AppError("Car is unavailable"));
    }
  });

  it("should not be able to create rental when user has another rental ongoing", async () => {
    try {
      await inMemoryCarsRepository.create({ ...mockedCar, id: "car_id1" });
      await inMemoryCarsRepository.create({ ...mockedCar, id: "car_id2" });
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
      expect(error).toEqual(new AppError("User already has a rental ongoing"));
    }
  });

  it("should not be able to create rental when expected_return_date is before 24hrs from start_date", async () => {
    try {
      await createRentalUseCase.execute({
        ...mockedRentalInput,
        expected_return_date: dayjs().add(23, "hours").toDate(),
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Invalid return time"));
    }
  });

  it("should be able to change car availability after rental creation", async () => {
    await inMemoryCarsRepository.create(mockedCar);
    await createRentalUseCase.execute(mockedRentalInput);

    const car = await inMemoryCarsRepository.findById(mockedRentalInput.car_id);
    expect(car.available).toBe(false);
  });
});
