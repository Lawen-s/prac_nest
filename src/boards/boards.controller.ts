import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto, FindBoardByIdRequestParam } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get('/:id')
    getBoardById(@Param() param: FindBoardByIdRequestParam): Promise<Board> {
        return this.boardsService.getBoardById(param.id);
    }

    @Get('/')
    getAllBoards(): Promise<Board[]>{
        return this.boardsService.findAllBoards();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto:CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto)
    }

    @Delete('/:id')
    DeleteBoard(@Param('id', ParseIntPipe) id):Promise<void>{
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
        ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id,status )
    }
}
