import { Specification } from "../entities/Specification"

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>
  create(data: ICreateSpecificationDTO): Promise<void>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }