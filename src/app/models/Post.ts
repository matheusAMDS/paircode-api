import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

import Interest from './Interest'
import User from './User'

@Entity()
export default class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @Column()
  subject: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(type => Interest, interest => interest.post)
  interests: Interest[]

}
