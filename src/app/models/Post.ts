import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

import { User } from './User'

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @Column()
  subject: string;

  @CreateDateColumn()
  createdAt: Date;

}