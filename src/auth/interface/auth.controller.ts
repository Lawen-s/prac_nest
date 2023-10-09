import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpRequestDto } from './dto/sign-up.dto';
import { UserSignUpCommand } from '../application/command/sign-up/sign-up.command';

@Controller('auth')
export class AuthController {
  constructor(
    readonly commandBus: CommandBus
  ){
  }

  @Post('')
  async signUp(@Body() body:SignUpRequestDto){
    const command = new UserSignUpCommand(
      body.username,
      body.password
    )
    await this.commandBus.execute(command);
  }
}
