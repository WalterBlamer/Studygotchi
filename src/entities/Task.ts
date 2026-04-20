import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Task {
  @PrimaryColumn()
  taskId: string;

  @BeforeInsert()
  generateId(): void {
    this.taskId = uuidv7();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ default: false })
  completed: boolean;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: Relation<User>;
}
