import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateReactionRoles1694294692984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'reactionroles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'guild',
                        type: 'varchar',
                    },
                    {
                        name: 'channel',
                        type: 'varchar',
                    },
                    {
                        name: 'roles',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reactionroles');
    }

}
