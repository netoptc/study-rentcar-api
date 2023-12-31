import { Response, Request } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { specifications_id } = request.body;

        const createCategoryUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCategoryUseCase.execute({
            car_id: id,
            specifications_id: specifications_id,
        })

        return response.json(cars);
    }
}   

export { CreateCarSpecificationController }