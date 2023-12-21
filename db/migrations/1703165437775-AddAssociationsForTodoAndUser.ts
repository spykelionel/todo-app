import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssociationsForTodoAndUser1703165437775 implements MigrationInterface {
    name = 'AddAssociationsForTodoAndUser1703165437775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`userId\``);
    }

}
