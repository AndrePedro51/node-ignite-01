import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Users } from "../../entities/Users";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{
    private repository: Repository<Users>

    constructor(){
        this.repository = getRepository(Users);
    }
    async create({ name, email, password, username, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, 
            email, 
            password, 
            username, 
            driver_license
        })

        await this.repository.save(user);
    }

}

export { UsersRepository };