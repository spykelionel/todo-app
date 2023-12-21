import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  password: string;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos: Todo[];
}
