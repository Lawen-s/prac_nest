import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserSignUpCommand } from "./sign-up.command";
import { UserRepository } from "../user.repository";
import { UserRepositoryImplement } from "src/auth/infrastructure/repository/user.repository-implement";
import { Inject, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/infrastructure/entity/user.entity";
import { InjectionToken } from "../../inject-token";



@CommandHandler(UserSignUpCommand)
export class UserSignUpHandler implements ICommandHandler<UserSignUpCommand> {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;
  async execute(command: UserSignUpCommand): Promise<any> {
    const existUser = await this.userRepository.findByName(command.username)
    if (existUser) {
      throw new NotFoundException(`Can't use username ${command.username}` )
    }
    const emptyUser = new User();
    Object.assign(emptyUser,command)
    await this.userRepository.save(emptyUser)
  }
}