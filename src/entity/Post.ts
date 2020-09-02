import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

import { User } from 'entity/User'

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User;

  @Column()
  subject: string;

  @CreateDateColumn()
  createdAt: Date;

}
