import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.userRepository.insert(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    const user = this.userRepository.findOneBy({ id });
    return user || null;
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
