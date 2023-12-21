import { IsInt, IsString } from 'class-validator';
import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  email!: string;

  @Column()
  @IsString()
  name!: string;

  @Column()
  password?: string;

  @OneToMany((type) => Todo, (todo) => todo.user, {
    nullable: true,
    // eager: true,
  })
  todos: Todo[];
}
