import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "../listCategories/ListCategoriesUseCase";

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoryUseCase);
        const categories = await listCategoriesUseCase.execute();
        return response.json(categories);
    }
}

export { ListCategoryController };