import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}
