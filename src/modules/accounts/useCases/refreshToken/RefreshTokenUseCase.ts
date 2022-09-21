import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "../../../../config/authConfig";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IPayload {
  email: string;
  sub: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const { email, sub: user_id } = verify(
      refresh_token,
      authConfig.secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token
      );

    if (!userToken) {
      throw new AppError("Refresh Token not found");
    }

    // delete old refresh_token record
    await this.userTokensRepository.deleteById(userToken.id);

    // generate new refresh_token
    const new_refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    // insert new refresh_token in db
    await this.userTokensRepository.create({
      user_id,
      refresh_token: new_refresh_token,
      expires_date: this.dateProvider.addSecondsToDate(
        new Date(),
        authConfig.expires_in_refresh_token
      ),
    });

    return new_refresh_token;
  }
}

export { RefreshTokenUseCase };
