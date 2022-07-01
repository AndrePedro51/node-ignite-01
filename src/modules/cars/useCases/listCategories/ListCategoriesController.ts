import { Request, Response } from "express";
import { ListCategoryUseCase } from "../listCategories/ListCategoriesUseCase";

class ListCategoryController {
    constructor(private listCategoriesUseCase: ListCategoryUseCase){}
    handle(request: Request, response: Response): Response{
        const categories = this.listCategoriesUseCase.execute();
        return response.json(categories);
    }
}

export { ListCategoryController };