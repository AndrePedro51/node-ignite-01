import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoryRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor(){//private por causa do singleton pattern
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoryRepository {//singleton pattern
    //     if(!CategoryRepository.INSTANCE){
    //         CategoryRepository.INSTANCE = new CategoryRepository();
    //     }
    //     return CategoryRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category>{
        const category = await this.repository.findOne({ name });
        return category;
    }
    
}

export { CategoryRepository };