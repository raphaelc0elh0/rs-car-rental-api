import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserTokens } from "../../typeorm/entities/UserTokens";

class InMemoryUserTokensRepository implements IUserTokensRepository {
  userTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, data);
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const idx = this.userTokens.findIndex((userToken) => userToken.id === id);
    this.userTokens.splice(idx, 1);
  }
}
export { InMemoryUserTokensRepository };
