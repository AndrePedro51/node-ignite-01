import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IReposnse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IReposnse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "bf2f90ead9638046e7a6700efd6be1d6", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IReposnse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };