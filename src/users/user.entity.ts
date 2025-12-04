import { Benificiary } from "src/benificiary/benificiary.entity";
import { Transaction } from "src/transactions/transactions.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Benificiary, beneficiary => beneficiary.user, { cascade: true })
    beneficiaries: Benificiary[];

    @OneToMany(() => Transaction, transaction => transaction.user, { cascade: true })
    transactions: Transaction[];
}