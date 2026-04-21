import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Achievement } from './Achievement.js';
import { User } from './User.js';

@Entity()
export class UserAchievement {
  @PrimaryColumn()
  userAchievementId: string;

  @BeforeInsert()
  generateId(): void {
    this.userAchievementId = uuidv7();
  }

  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.userAchievements)
  user: Relation<User>;

  // UserAchievement references Achievement, but not other way around
  @ManyToOne(() => Achievement, () => {})
  achievement: Relation<Achievement>;
}
