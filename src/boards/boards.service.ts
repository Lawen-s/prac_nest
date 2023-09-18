import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
    private boards: Board[] = [];



    getAllboards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description} = createBoardDto
        const board: Board = {
            id:uuid(),
            title,
            description,
            status: BoardStatus.PRIVATE
        }
        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        return this.boards.find(board => board.id === id)
    }

    delete(id:string): void {
        this.boards = this.boards.filter(board => board.id !== id)
        return 
    }

    update(id:string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}