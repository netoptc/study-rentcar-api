import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { container } from "tsyringe";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase =  container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };