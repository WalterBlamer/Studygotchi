import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm';
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
    this.joinCode = 
  }

  @Column()
  roomName: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ unique: true })
  joinCode: string;

  @OneToMany(() => User, (user) => user.studyroom)
  members: Relation<User[]>;
}
