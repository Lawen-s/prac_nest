import { ICommand } from "@nestjs/cqrs";


export class UserSignUpCommand implements ICommand {
  constructor(
    readonly username: string,
    readonly password: string
  ){
  }
}