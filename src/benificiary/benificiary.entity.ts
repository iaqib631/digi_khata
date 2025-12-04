import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Benificiary {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique: true})
    email:string;

    @Column()
    phone: number;

    @Column()
    address: string;

    @ManyToOne(() => User, user => user.beneficiaries)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;
}