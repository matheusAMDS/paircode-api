import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm"

import { Post } from '../entity/Post'

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
}
