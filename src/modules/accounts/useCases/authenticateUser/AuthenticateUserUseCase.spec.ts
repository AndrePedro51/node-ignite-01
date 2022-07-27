import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

describe("Authenticate User", () => {
    let authenticateUserUseCase : AuthenticateUserUseCase;
    let usersRepositoryInMemory: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("Should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123456",
            email: "andre@andre.com",
            name: "Andre",
            password: "123456"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    });

    it("Should be not able to authenticate an non existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "123456"
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Shoul be not albe to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "123456",
                name: "andre",
                password: "123456",
                email: "andre@andre.com"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "andre@andre.com",
                password: "456789"
            })
        }).rejects.toBeInstanceOf(AppError);
    })
})