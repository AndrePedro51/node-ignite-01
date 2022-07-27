import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { Users } from "../../infra/typeorm/entities/Users";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
    users: Users[] = [];
    async create({driver_license, email, password, name}: ICreateUserDTO):  Promise<void> {
        const user = new Users();

        Object.assign(user, {
            driver_license,
            name,
            password,
            email
        });

        this.users.push(user);
    }
    async findByEmail(email: string): Promise<Users> {
        const user = this.users.find((user) => user.email === email);

        return user;
    }
    async findById(id: string): Promise<Users> {
        const user = this.users.find((user) => user.id === id);

        return user;
    }

}

export { UserRepositoryInMemory };