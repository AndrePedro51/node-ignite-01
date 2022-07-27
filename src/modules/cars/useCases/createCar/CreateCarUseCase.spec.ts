import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            brand: "Brand",
            category_id: "123category", 
            daily_rate: 100, 
            description: "Description", 
            fine_amount: 60, 
            license_plate: "ABC-1234", 
            name: "Name car"

        });

        expect(car).toHaveProperty("id");
    })
    it("Should not be able to create a car with exist license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                brand: "Brand",
                category_id: "123category", 
                daily_rate: 100, 
                description: "Description", 
                fine_amount: 60, 
                license_plate: "ABC-1234", 
                name: "Car 1"
    
            });
            await createCarUseCase.execute({
                brand: "Brand",
                category_id: "123category", 
                daily_rate: 100, 
                description: "Description", 
                fine_amount: 60, 
                license_plate: "ABC-1234", 
                name: "Car 2"
    
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            brand: "Brand",
            category_id: "123category", 
            daily_rate: 100, 
            description: "Description", 
            fine_amount: 60, 
            license_plate: "ABC-1234", 
            name: "Car Available"

        });
        expect(car.available).toBe(true);
    })
})