import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoryRepository implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoryRepository; //singleton pattern

    private constructor(){//private por causa do singleton pattern
        this.categories = [];
    }

    public static getInstance(): CategoryRepository {//singleton pattern
        if(!CategoryRepository.INSTANCE){
            CategoryRepository.INSTANCE = new CategoryRepository();
        }
        return CategoryRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();
    
        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category{
        const category = this.categories.find(categories => categories.name === name);
        return category;
    }
    
}

export { CategoryRepository };