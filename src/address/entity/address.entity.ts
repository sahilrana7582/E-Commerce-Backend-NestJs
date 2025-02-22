import { Order } from 'src/order/entity/order.entity';
import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.address, {
    nullable: true,
  })
  userProfile?: UserProfile;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: number;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
