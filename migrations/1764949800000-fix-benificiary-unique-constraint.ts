import { MigrationInterface, QueryRunner } from "typeorm";

export class FixBenificiaryUniqueConstraint1764949800000 implements MigrationInterface {
    name = 'FixBenificiaryUniqueConstraint1764949800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the old unique index on email only
        await queryRunner.query(`ALTER TABLE \`benificiary\` DROP INDEX \`IDX_8a90ce2f451888dddb5d82d4ea\``);
        
        // Create new composite unique index on userId and email
        await queryRunner.query(`ALTER TABLE \`benificiary\` ADD UNIQUE INDEX \`IDX_benificiary_user_email\` (\`userId\`, \`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the composite unique index
        await queryRunner.query(`ALTER TABLE \`benificiary\` DROP INDEX \`IDX_benificiary_user_email\``);
        
        // Restore the old unique index on email only
        await queryRunner.query(`ALTER TABLE \`benificiary\` ADD UNIQUE INDEX \`IDX_8a90ce2f451888dddb5d82d4ea\` (\`email\`)`);
    }
}
