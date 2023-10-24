import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserSignUpCommand } from "./sign-up.command";
import { UserRepository } from "../user.repository";
import { Inject, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/infrastructure/entity/user.entity";
import { InjectionToken } from "../../inject-token";
import * as bcrypt from 'bcryptjs';


@CommandHandler(UserSignUpCommand)
export class UserSignUpHandler implements ICommandHandler<UserSignUpCommand> {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;
  async execute(command: UserSignUpCommand): Promise<any> {
    // const existUser = await this.userRepository.findByName(command.username)
    // if (existUser) {
    //   throw new NotFoundException(`Can't use username ${command.username}` )
    // }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(command.password,salt);

    const emptyUser = new User();
    Object.assign(emptyUser,command)
    emptyUser.password = hashedPassword;
    await this.userRepository.save(emptyUser)
  }
}