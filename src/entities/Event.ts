import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Event {
  @PrimaryColumn()
  eventId: string;

  @BeforeInsert()
  generateId(): void {
    this.eventId = uuidv7();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @Column()
  text: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: Relation<User>;
}
