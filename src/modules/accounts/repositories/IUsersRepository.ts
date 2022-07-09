import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Users } from "../entities/Users"


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<Users>;
    findById(id: string): Promise<Users>;
}

export { IUsersRepository };