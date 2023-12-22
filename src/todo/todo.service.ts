import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
