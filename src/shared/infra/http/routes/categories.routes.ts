//Criação de rotas para nossa aplicação

import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController"
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
const categoriesRoutes = Router();

// multer para upload de arquivos
const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post("/",ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import",ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle)

export { categoriesRoutes };