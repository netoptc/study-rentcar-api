import { Repository, getRepository } from "typeorm";
import { User } from "../../entities/User";

import { ICreateUserDTO, IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }   

    async create(data: ICreateUserDTO): Promise<void> {
        const { id, name, email, password, driver_license, avatar } = data;
        const user = this.repository.create({
            id,
            name,
            email,
            password,
            driver_license,
            avatar,
        })
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
} 

export { UserRepository }
