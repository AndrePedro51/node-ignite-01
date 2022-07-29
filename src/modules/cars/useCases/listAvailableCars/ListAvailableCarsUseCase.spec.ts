import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase : ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })
    it("Shoul be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Chevrolet", 
            category_id: "3c14049a-3293-49d3-86d0-001582a32cd1", 
            daily_rate: 250, 
            description: "Mini-Van", 
            fine_amount: 150, 
            license_plate: "asb-3212", 
            name: "Meriva" 
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Chevrolet", 
            category_id: "3c14049a-3293-49d3-86d0-001582a32cd1", 
            daily_rate: 250, 
            description: "Mini-Van2", 
            fine_amount: 150, 
            license_plate: "asb-3212", 
            name: "Meriva2" 
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "Mini-Van2" });
        expect(cars).toEqual([car]);
    })

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Chevrolet", 
            category_id: "3c14049a-3293-49d3-86d0-001582a32cd1", 
            daily_rate: 250, 
            description: "Mini-Van2", 
            fine_amount: 150, 
            license_plate: "asb-3212", 
            name: "Meriva3" 
        });

        const cars = await listAvailableCarsUseCase.execute({ name: "Meriva3" });
        expect(cars).toEqual([car]);
    })

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "Chevrolet", 
            category_id: "category-id-test", 
            daily_rate: 250, 
            description: "Mini-Van2", 
            fine_amount: 150, 
            license_plate: "asb-3212", 
            name: "Meriva4" 
        });

        const cars = await listAvailableCarsUseCase.execute({ category_id: "category-id-test" });
        expect(cars).toEqual([car]);
    })
})