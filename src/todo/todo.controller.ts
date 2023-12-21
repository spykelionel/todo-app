import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/util/ValidationSchema';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { UpdateTodoDto, updateTodoSchema } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createTodoSchema))
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    console.log(req.user);
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateTodoSchema))
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
