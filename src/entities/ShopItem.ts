import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

// replace with what a shop will actually include: outfit, background, pets?
export type ItemType = 'placeholder1' | 'placeholder2' | 'placeholder3';

@Entity()
export class ShopItem {
  @PrimaryColumn()
  itemId: string;

  @BeforeInsert()
  generateId(): void {
    this.itemId = uuidv7();
  }

  @Column()
  itemName: string;

  @Column({ type: 'text' }) // no string max length
  description: string;

  @Column()
  pointCost: number;

  @Column()
  itemType: ItemType;
}
