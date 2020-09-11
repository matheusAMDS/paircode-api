import { Exclude, Transform } from 'class-transformer'
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  JoinColumn, 
  OneToMany,
  AfterLoad
} from "typeorm"

import { Post } from './Post'
import { BASE_CLOUD_FILE_URL } from '@config/app'

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column()
	whatsapp: string;

	@Column({ select: false })
	passwordHash: string;

	@Column({ nullable: true })
  avatar: string;

	@Column({ nullable: true, type: 'text' })
	bio: string;

  @OneToMany(type => Post, post => post.user)
  @JoinColumn()
  posts: Post[];

  @AfterLoad()
  private exposeAvatarUrl() {
    this.avatar = `${BASE_CLOUD_FILE_URL}/${this.avatar}`
  }

}
