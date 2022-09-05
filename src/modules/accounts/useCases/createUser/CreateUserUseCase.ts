import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("PostgresUsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
    // const userAlreadyExists = await this.usersRepository.findByName(name)

    // if (userAlreadyExists) {
    //   throw new Error('User already exists')
    // }

    await this.usersRepository.create({ name, username, password, email, driver_license })
  }
}

export { CreateUserUseCase }