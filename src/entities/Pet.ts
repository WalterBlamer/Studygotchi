import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Pet {
  @PrimaryColumn()
  petId: string;

  @BeforeInsert()
  generateId(): void {
    this.petId = uuidv7();
  }

  @Column()
  petName: string;

  @Column({ type: 'timestamptz' }) // stores current date
  createdAt: Date;

  @Column()
  speciesId: number;

  @Column({ default: 1 })
  outfitId: number;

  @Column({ default: 1 })
  colorSchemeId: number;

  @Column({ default: 50 })
  happiness: number;
}
