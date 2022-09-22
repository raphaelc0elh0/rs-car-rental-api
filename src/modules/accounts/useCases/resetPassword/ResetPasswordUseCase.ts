import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    const isExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      new Date()
    );
    if (isExpired) {
      throw new AppError("Expired token");
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    console.log({ ...user, password: await hash(password, 8) });

    await this.usersRepository.create({
      ...user,
      password: await hash(password, 8),
    });
    await this.userTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
