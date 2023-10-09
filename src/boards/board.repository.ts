import { DataSource, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBoardDto, DeleteBoard } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";


@Injectable()
export class BoardRepository {
  constructor(
    private readonly db: DataSource
){}
  
  async findAllBoard(): Promise<Board[]> {
    return await this.db.getRepository(Board).find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.db.getRepository(Board).save({status:BoardStatus.PUBLIC,...createBoardDto})
  }

  async deleteBoard(id:DeleteBoard): Promise<void> {
   const result =  await this.db.getRepository(Board).delete(id)
   if(result.affected === 0){
      throw new NotFoundException(`Can't find Board with id ${id}` )
   }
  }

  async updateBoard( status:BoardStatus, board: Board): Promise<Board> {
    board.status = status;
    await this.db.getRepository(Board).save(board);
    return board
  }
}