import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteBeneficiary1764941200000 implements MigrationInterface {
    name = 'AddCascadeDeleteBeneficiary1764941200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the existing foreign key constraint
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_590be1e5384f216fb8d2f139a1a\``);
        
        // Recreate with CASCADE DELETE
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_590be1e5384f216fb8d2f139a1a\` FOREIGN KEY (\`benificiaryId\`) REFERENCES \`benificiary\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the cascade foreign key
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_590be1e5384f216fb8d2f139a1a\``);
        
        // Restore the original without CASCADE
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_590be1e5384f216fb8d2f139a1a\` FOREIGN KEY (\`benificiaryId\`) REFERENCES \`benificiary\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
