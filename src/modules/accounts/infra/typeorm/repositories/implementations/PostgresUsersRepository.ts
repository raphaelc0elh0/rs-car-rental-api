import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../../repositories/IUsersRepository";
import { User } from "../../entities/User";

class PostgresUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);
    await this.repository.save(user);
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export { PostgresUsersRepository };
