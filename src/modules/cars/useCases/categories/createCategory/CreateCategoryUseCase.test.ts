import { AppError } from "../../../../../shared/errors/AppError";
import { InMemoryCategoriesRepository } from "../../../infra/inMemory/repositories/InMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("CreateCategoryUseCase", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };
    await createCategoryUseCase.execute(category);

    const createdCategory = await inMemoryCategoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a duplicated category", async () => {
    try {
      const category = {
        name: "Category Test",
        description: "Category description test",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    } catch (error) {
      expect(error).toEqual(new AppError("Category already exists"));
    }
  });
});
