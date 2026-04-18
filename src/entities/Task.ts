import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

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

  @Column({ type: 'timestamptz' }) // stores current date
  createdAt: Date;

  @Column({ type: 'timestamptz' }) // stores current date
  updatedAt: Date;

  @Column({ type: 'timestamptz' }) // stores current date
  dueDate: Date;

  @Column({ default: false })
  completed: boolean;

  @Column()
  text: string;
}
