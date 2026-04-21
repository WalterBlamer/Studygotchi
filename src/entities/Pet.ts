import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { User } from './User.js';

@Entity()
export class Pet {
  @PrimaryColumn()
  petId: string;

  @BeforeInsert()
  generateId(): void {
    this.petId = uuidv7();
  }

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column()
  petName: string;

  @Column()
  speciesId: number;

  @Column({ default: 1 })
  outfitId: number;

  @Column({ default: 1 })
  colorSchemeId: number;

  @Column({ default: 50 })
  happiness: number;

  @ManyToOne(() => User, (user) => user.pets)
  user: Relation<User>;
}
