import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) {}

    create(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    async findOne(id:number) {
        if(!id) {
            return null;
        }
        return await this.repo.findOneBy({id});
    }

    async find(email: string) {
        return await this.repo.findBy({ email});
    }

    findAll(): Promise<User[]>{
        return this.repo.find()
    }

    async remove(id:number):Promise<void> {
        const result = await this.repo.delete({id});
        if(result.affected === 0) {
            throw new NotFoundException('User not found');
        }
    }
}
