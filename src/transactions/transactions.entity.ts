import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: 'enum', enum: ['in', 'out'] })
    type: 'in' | 'out';

    // @Column({ nullable: true })
    // description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.transactions)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;
}