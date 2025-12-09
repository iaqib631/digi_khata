import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Unique, OneToMany } from "typeorm";
import { Transaction } from "../transactions/transactions.entity";

@Entity()
@Unique(['userId', 'email'])
export class Benificiary {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column({ type: 'varchar', length: 32 })
    phone: string;

    @Column()
    address: string;

    @ManyToOne(() => User, user => user.beneficiaries)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => Transaction, transaction => transaction.benificiary, { cascade: true, onDelete: 'CASCADE' })
    transactions: Transaction[];
}