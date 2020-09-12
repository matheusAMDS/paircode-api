import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateInterest1599869782656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'interest',
      columns: [
        {
          name: 'id',
          type: 'int',
          isGenerated: true,
          isPrimary: true,
          isNullable: false
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false
        },
        {
          name: 'postId',
          type: 'int',
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKeys('interest', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user'
      }),
      new TableForeignKey({
        columnNames: ['postId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'post'
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('interest')
  }

}
