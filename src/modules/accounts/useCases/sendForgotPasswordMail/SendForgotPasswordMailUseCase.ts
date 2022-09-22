// interface IRequest{

import path from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

// }

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exist");
    }

    const token = uuidV4();
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addSecondsToDate(new Date(), 60 * 60 * 3), // 3 hours
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_PASSWORD_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      path.resolve(
        __dirname,
        "..",
        "..",
        "views",
        "emails",
        "forgotPassword.hbs"
      )
    );
  }
}

export { SendForgotPasswordMailUseCase };
