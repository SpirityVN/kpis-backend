import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn({name: 'user_id'})
  userId: number;

  @Column()
  nonce: number;

  @Column({unique: true, nullable: false})
  publicAddress: string;
  
  @Column()
  username: string;
}