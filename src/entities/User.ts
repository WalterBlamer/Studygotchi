import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Note } from './Note.js';
import { Task } from './Task.js';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
    this.createdAt = new Date();
    this.lastLoginAt = new Date();
  }

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column()
  displayName: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  lastLoginAt: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes: Relation<Note>[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Relation<Task>[];
}
