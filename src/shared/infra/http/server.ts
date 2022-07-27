//yarn add ts-node-dev -D faz a conversao do TS para o JS para o node conseguir processar
// flags que colocamos no script dev: "ts-node-dev --transpile-only --ignore-watch node_modules --respaw src/server.ts"
//--transpile-only para não dar erro no momento de desenvolvimento, apenas no momento de buildar
//--ignore-watch node_modules não ficar verificando as mudanças na pasta node_modules
//--respaw atualizar o server sempre que salvarmos
//--inspect para conectar o debugger na nossa aplicação
//Alterar o launsh.json do debug. Alterar o Type para node. Muda o request para attach e apaga o program, serve para encapsular o debug na nossa aplicação.

import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from "../../../swagger.json";

import "@shared/infra/typeorm";
import "@shared/container"
import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

app.listen(3333, () => console.log("Server is running"));
