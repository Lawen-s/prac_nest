import { UserRepository } from "src/auth/application/command/user.repository";
import { User } from "../entity/user.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";


@Injectable()
export class UserRepositoryImplement implements UserRepository {
  constructor(private readonly db: DataSource){}

  async findByName(username: string): Promise<User> {
    return await this.db.getRepository(User).findOne({where:{username}})
  }
  async save(user: User): Promise<void> {
    try{
      await this.db.getRepository(User).save(user)
    }catch(error){
      if (error.code==='23505'){
        throw new ConflictException('Already Use User Name')
      }
    }
  }
}