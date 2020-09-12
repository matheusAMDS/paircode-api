import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm'

import User from './User'
import Post from './Post'

@Entity()
export default class Interest {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  user: User

  @ManyToOne(type => Post)
  post: Post

}