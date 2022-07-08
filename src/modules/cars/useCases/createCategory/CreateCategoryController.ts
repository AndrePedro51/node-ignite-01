import { Request, Response } from "express";
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);// intanciando o create category use case
        await createCategoryUseCase.execute({ name, description });//executando o service

        return response.status(201).send();
    }    
}

export { CreateCategoryController };