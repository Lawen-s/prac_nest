import { Injectable } from '@nestjs/common';
import { Board, boardStatus } from './boards.model';
import {v1 as uuid} from 'uuid';
@Injectable()
export class BoardsService {
    private boards: Board[] = [];



    getAllboards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id:uuid(),
            title,
            description,
            status: boardStatus.PRIVATE
        }
        this.boards.push(board);
        return board;
    }
}
