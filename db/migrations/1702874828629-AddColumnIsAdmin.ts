import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnIsAdmin1702874828629 implements MigrationInterface {
    name = 'AddColumnIsAdmin1702874828629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
    }

}
