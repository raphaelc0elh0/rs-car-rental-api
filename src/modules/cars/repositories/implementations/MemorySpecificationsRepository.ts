import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class MemorySpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  private static INSTANCE: MemorySpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): MemorySpecificationsRepository {
    if (!MemorySpecificationsRepository.INSTANCE) {
      MemorySpecificationsRepository.INSTANCE = new MemorySpecificationsRepository()
    }
    return MemorySpecificationsRepository.INSTANCE
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, { name, description, created_at: new Date() })

    this.specifications.push(specification)
  }

  findByName(name: string) {
    return this.specifications.find(specification => specification.name === name)
  }
}

export { MemorySpecificationsRepository }