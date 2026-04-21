import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Achievement {
  @PrimaryColumn()
  achievementId: string;

  @BeforeInsert()
  generateId(): void {
    this.achievementId = uuidv7();
  }

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  pointValue: number;
}
