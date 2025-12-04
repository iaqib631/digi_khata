import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1764856485989 implements MigrationInterface {
    name = 'AutoMigration1764856485989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`benificiary\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`benificiary\` ADD \`phone\` varchar(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`benificiary\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`benificiary\` ADD \`phone\` int NOT NULL`);
    }

}
