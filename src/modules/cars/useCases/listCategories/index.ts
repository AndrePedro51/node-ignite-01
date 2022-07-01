import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoryController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoriesController = new ListCategoryController(listCategoriesUseCase);

export { listCategoriesController };