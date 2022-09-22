import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../infra/inMemory/repositories/InMemoryUsersRepository";
import { InMemoryUserTokensRepository } from "../../infra/inMemory/repositories/InMemoryUserTokensRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTokensRepository: InMemoryUserTokensRepository;
let dayjsProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository();
    dayjsProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      dayjsProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to get a token", async () => {
    const user = {
      name: "Raphael",
      password: "password",
      email: "test@test.com.br",
      driver_license: "TEST1234",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to get a token if non existent user", async () => {
    try {
      await authenticateUserUseCase.execute({
        email: "false@email.com.br",
        password: "password",
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Email or password incorrect"));
    }
  });

  it("should not be able to get a token if incorrect password", async () => {
    const user = {
      name: "Raphael",
      password: "password",
      email: "test@test.com.br",
      driver_license: "TEST1234",
    };
    await createUserUseCase.execute(user);

    try {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "password1",
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Email or password incorrect"));
    }
  });
});
