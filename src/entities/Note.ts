import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { v7 as uuidv7 } from "uuid";

@Entity()
export class Note {
  @PrimaryColumn()
  noteId: string;

  @BeforeInsert()
  generateId(): void {
    this.noteId = uuidv7();
  }

  @Column()
  title: string;

  @Column({ type: "timestamptz" }) // stores current date
  createdAt: Date;

  @Column({ type: "timestamptz" }) // stores current date
  updatedAt: Date;

  @Column()
  text: string;
}
