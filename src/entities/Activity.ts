import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Activity {
  @PrimaryColumn()
  activityId: string;

  @BeforeInsert()
  generateId(): void {
    this.activityId = uuidv7();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  activityDate: Date;

  @Column()
  text: string;

  @Column()
  activityHours: number;

  @ManyToOne(() => User, (user) => user.activities)
  user: Relation<User>;
}
