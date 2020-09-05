import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1598991163214 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          isUnique: true,
          isNullable: false
        },
        {
          name: 'firstName',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'lastName',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'passwordHash',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'whatsapp',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'bio',
          type: 'text',
          isNullable: true
        }
      ]
    }), true)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
	}

}
