import { UserRepository } from "src/auth/application/command/user.repository";
import { User } from "../entity/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";


@Injectable()
export class UserRepositoryImplement implements UserRepository {
  constructor(private readonly db: DataSource){}

  async findByName(username: string): Promise<User> {
    return await this.db.getRepository(User).findOne({where:{username}})
  }
  async save(user: User): Promise<void> {
    await this.db.getRepository(User).save(user)
  }
}