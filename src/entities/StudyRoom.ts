import { randomBytes } from 'node:crypto';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class StudyRoom {
  @PrimaryColumn()
  roomId: string;

  @BeforeInsert()
  generateId(): void {
    this.roomId = uuidv7();
    this.createdAt = new Date();
    this.joinCode = randomBytes(3).toString('hex').slice(0, 5).toUpperCase();
  }

  @Column()
  roomName: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ unique: true })
  joinCode: string;

  @ManyToMany(() => User, (user) => user.studyRoom)
  @JoinTable()
  members: Relation<User[]>;
}
