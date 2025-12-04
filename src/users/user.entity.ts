import { Benificiary } from "../benificiary/benificiary.entity";
import { Transaction } from "../transactions/transactions.entity";
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