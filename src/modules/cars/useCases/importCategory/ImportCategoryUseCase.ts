import { parse } from 'csv-parse';
import fs from 'fs';//nativo do express
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoryRepository: ICategoriesRepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            //faz leitura dos arquivos em partes
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            //lib para ler arquivos csv
            const parseFile = parse();
            //envia cada parte do arquivo para um destino
            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            })
            .on("end", () => {
                fs.promises.unlink(file.path);//remove o arquivo depois de usado
                resolve(categories);
            })
            .on("error", (error) => {
                reject(error);
            })
        });
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);
        
        categories.map(category => {
            const { name, description } = category;

            const existCategory = this.categoryRepository.findByName(name);

            if(!existCategory){
                this.categoryRepository.create({
                    name,
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase };