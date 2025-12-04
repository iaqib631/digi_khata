import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Unique } from "typeorm";

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
}