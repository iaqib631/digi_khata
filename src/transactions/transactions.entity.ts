import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from "typeorm";
import { Benificiary } from "../benificiary/benificiary.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: 'enum', enum: ['in', 'out'] })
    type: 'in' | 'out';



    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.transactions)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Benificiary, ben => ben.id, { nullable: true })
    @JoinColumn({ name: 'benificiaryId' })
    benificiary?: Benificiary;

    @Column({ nullable: true })
    benificiaryId?: number;
}