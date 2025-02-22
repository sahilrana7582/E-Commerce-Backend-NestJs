import { Address } from 'src/address/entity/address.entity';
import { User } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.userProfile, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  address?: Address;

  @OneToOne(() => User, (user) => user.userProfile, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
