import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePost1598993642880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'post',
      columns: [
        {
          name: 'id',
          type: 'int',
          isNullable: false,
          isGenerated: true,
          isPrimary: true
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false 
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'subject',
          type: 'varchar',
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey("post", new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "user"
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('post')
  }

}