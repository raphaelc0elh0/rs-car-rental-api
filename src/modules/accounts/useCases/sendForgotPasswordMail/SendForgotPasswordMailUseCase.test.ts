import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { InMemoryMailProvider } from "../../../../shared/container/providers/MailProvider/inMemory/InMemoryMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../infra/inMemory/repositories/InMemoryUsersRepository";
import { InMemoryUserTokensRepository } from "../../infra/inMemory/repositories/InMemoryUserTokensRepository";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTokensRepository: InMemoryUserTokensRepository;
let dayjsProvider: DayjsDateProvider;
let inMemoryMailProvider: InMemoryMailProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("SendForgotPasswordMailUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository();
    dayjsProvider = new DayjsDateProvider();
    inMemoryMailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      dayjsProvider,
      inMemoryMailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, "sendMail");

    const userEmail = "user@email.com";

    await inMemoryUsersRepository.create({
      name: "Test User",
      password: "password",
      email: userEmail,
      driver_license: "ABCD-1234",
    });

    await sendForgotPasswordMailUseCase.execute(userEmail);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should be able to create a new userToken", async () => {
    const createUserToken = jest.spyOn(inMemoryUserTokensRepository, "create");

    const userEmail = "user2@email.com";

    await inMemoryUsersRepository.create({
      name: "Test User2",
      password: "password",
      email: userEmail,
      driver_license: "ABCD-1234",
    });

    await sendForgotPasswordMailUseCase.execute(userEmail);

    expect(createUserToken).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password mail if user does not exist", async () => {
    const sendMail = jest.spyOn(inMemoryMailProvider, "sendMail");

    try {
      await sendForgotPasswordMailUseCase.execute("wrong-email@email.com");
    } catch (error) {
      expect(error).toEqual(new AppError("User does not exist"));
      expect(sendMail).not.toHaveBeenCalled();
    }
  });
});
