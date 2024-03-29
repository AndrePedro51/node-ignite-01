import { ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAllCarsAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository };