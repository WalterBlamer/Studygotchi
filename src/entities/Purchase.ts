import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ShopItem } from './ShopItem.js';
import { User } from './User.js';

@Entity()
export class Purchase {
  @PrimaryColumn()
  purchaseId: string;

  @BeforeInsert()
  generateId(): void {
    this.purchaseId = uuidv7();
    this.purchasedAt = new Date();
  }

  @Column({ type: 'timestamptz' })
  purchasedAt: Date;

  @ManyToOne(() => User, (user) => user.purchases)
  user: Relation<User>;

  // Purchase references ShopItem, but not other way around
  @ManyToOne(() => ShopItem, () => {})
  shopItem: Relation<ShopItem>;
}
