import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface IUser {
  create(createUserDto: CreateUserDto): Promise<InsertResult | string>;

  findAll(): Promise<User[]>;

  findOne(id: number): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;

  remove(id: number): Promise<DeleteResult>;
}
