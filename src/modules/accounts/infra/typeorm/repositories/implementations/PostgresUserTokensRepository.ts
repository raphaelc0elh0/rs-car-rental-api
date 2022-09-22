import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../../dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "../../../../repositories/IUserTokensRepository";
import { UserTokens } from "../../entities/UserTokens";

class PostgresUserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);
    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const user_token = await this.repository.findOne({
      refresh_token,
    });
    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const user_token = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return user_token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PostgresUserTokensRepository };
