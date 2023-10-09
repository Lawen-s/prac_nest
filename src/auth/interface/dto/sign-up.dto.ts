import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignUpRequestDto {
  @IsString()
  @ApiProperty({example: "Hong"})
  username: string;

  @IsString()
  @ApiProperty({example: "qwer1234"})
  password: string;
}