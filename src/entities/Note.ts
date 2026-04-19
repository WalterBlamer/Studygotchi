import { BeforeInsert, Column, Entity, PrimaryColumn, ManyToOne, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Note {
  @PrimaryColumn()
  noteId: string;

  @BeforeInsert()
  generateId(): void {
    this.noteId = uuidv7();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: Relation<User>;
}
