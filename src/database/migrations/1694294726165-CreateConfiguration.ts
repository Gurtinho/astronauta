import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateConfiguration1694294726165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'configuration',
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
                        name: 'badwords',
                        type: 'varchar',
                    },
                    {
                        name: 'antilinks',
                        type: 'varchar',
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
        await queryRunner.dropTable('configuration');
    }

}
