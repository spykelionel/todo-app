import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIsAdminField1703025841003 implements MigrationInterface {
    name = 'RemoveIsAdminField1703025841003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL`);
    }

}
