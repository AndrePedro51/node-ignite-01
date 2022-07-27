import { AppError } from "@shared/errors/AppError";
import { CateogoriesRepositoriesInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CateogoriesRepositoriesInMemory;

describe("Create a category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CateogoriesRepositoriesInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })
    
    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Test Description"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })

    it("Should not be able to create a new category with same name", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category Test Description"
            }
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})