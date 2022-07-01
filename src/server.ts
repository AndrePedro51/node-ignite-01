//yarn add ts-node-dev -D faz a conversao do TS para o JS para o node conseguir processar
// flags que colocamos no script dev: "ts-node-dev --transpile-only --ignore-watch node_modules --respaw src/server.ts"
//--transpile-only para não dar erro no momento de desenvolvimento, apenas no momento de buildar
//--ignore-watch node_modules não ficar verificando as mudanças na pasta node_modules
//--respaw atualizar o server sempre que salvarmos
//--inspect para conectar o debugger na nossa aplicação
//Alterar o launsh.json do debug. Alterar o Type para node. Muda o request para attach e apaga o program, serve para encapsular o debug na nossa aplicação.

import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running"));
