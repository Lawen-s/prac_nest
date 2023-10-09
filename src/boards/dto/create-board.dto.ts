import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class FindBoardByIdRequestParam {
  @IsString()
  readonly id: number;
}

export class DeleteBoard {
  @IsNumber()
  id: number;
}