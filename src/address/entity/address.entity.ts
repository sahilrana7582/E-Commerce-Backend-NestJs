import { UserProfile } from 'src/userprofile/entity/user-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
