import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Note } from './Note.js';
import { Pet } from './Pet.js';
import { Purchase } from './Purchase.js';
import { Task } from './Task.js';
import { UserAchievement } from './UserAchievement.js';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
    this.lastLoginAt = new Date();
  }

  @CreateDateColumn({ type: 'timestamptz' }) // timestamp & timezone
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  lastLoginAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column()
  displayName: string;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Relation<Pet>[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Relation<Note>[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Relation<Task>[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Relation<Purchase>[];

  @OneToMany(() => UserAchievement, (ua) => ua.user)
  userAchievements: Relation<UserAchievement>[];
}
