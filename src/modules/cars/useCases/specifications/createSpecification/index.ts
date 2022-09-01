import { MemorySpecificationsRepository } from "../../../repositories/implementations/MemorySpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = MemorySpecificationsRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }