import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto, DeleteBoard } from './dto/create-board.dto';
import { Board } from './board.entity';
import { DataSource } from 'typeorm';
import { BoardRepository } from './board.repository';
@Injectable()
export class BoardsService {
    constructor(
        private readonly db: DataSource,
        @Inject(BoardRepository)
        private readonly boardRepository: BoardRepository
    ){}

    async getBoardById(id: number): Promise<Board> {
        const found = await this.db.getRepository(Board).findOne({where:{id}});
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found
    }

    async findAllBoards(): Promise<Board[]> {
        return await this.boardRepository.findAllBoard()
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto)
    }

    async deleteBoard(id: DeleteBoard): Promise<void> {
        const result = await this.boardRepository.deleteBoard(id);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id)
        return this.boardRepository.updateBoard(status, board)
    }
}