import { Repository, getRepository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensReposito";

import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const token = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return token;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const token = await this.repository.findOne({
      refresh_token,
    });
    return token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UserTokensRepository };
