import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  JoinColumn, 
  OneToMany,
  AfterLoad
} from "typeorm"

import Post from './Post'
import { BASE_CLOUD_FILE_URL } from '@config/app'
import Interest from "./Interest";

@Entity()
export default class User {

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

  @OneToMany(type => Interest, interest => interest.user)
  interests: Interest[]

  @AfterLoad()
  private exposeAvatarUrl() {
    if (this.avatar)
      this.avatar = `${BASE_CLOUD_FILE_URL}/${this.avatar}`
  }

}
