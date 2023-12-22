import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  create(createTodoDto: CreateTodoDto, user: any) {
    try {
      return this.todoRepository.insert({ ...createTodoDto, user });
    } catch (error) {
      return error;
    }
  }

  findAll(): Promise<Todo[] | []> {
    return this.todoRepository.find();
  }

  async findOne(id: number) {
    try {
      const todo = await this.todoRepository.findOneBy({ id });
      if (todo) {
        return todo;
      } else {
        return {};
      }
    } catch (error) {
      throw new NotFoundException('Could not get specific todo');
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user: any) {
    const todo = await this.findOne(id);
    if (!todo) {
      return {
        message: 'Could not update an unknown todo',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }

    try {
      if ((todo as Todo).user.id !== (user as User).id) {
        throw new ForbiddenException();
      }
      const updatedTodo = await this.todoRepository.update(
        { id },
        updateTodoDto,
      );
      return {
        ...todo,
        title: updateTodoDto.title,
        affected: updatedTodo.affected,
      };
    } catch (error) {
      throw new BadRequestException(error, 'Could not perform this request.');
    }
  }

  async remove(id: number, user: any) {
    const todo = await this.findOne(id);
    if (!todo) {
      return {
        message: 'Could not update an unknown todo',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    try {
      if ((todo as Todo).user.id !== (user as User).id) {
        throw new ForbiddenException();
      }
      const deletedTodo = await this.todoRepository.delete({ id });
      return {
        affected: deletedTodo.affected,
        message: 'Todo successfully deleted',
      };
    } catch (error) {
      throw new BadRequestException(error, 'Could not perform this request.');
    }
  }
}
