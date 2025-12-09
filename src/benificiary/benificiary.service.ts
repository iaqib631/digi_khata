import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Benificiary } from './benificiary.entity';
import { CreateBenificiaryDto } from './dtos/create-benificiary.dto';
import { UpdateBenificiaryDto } from './dtos/update-benificiary.dto';
import { Transaction } from '../transactions/transactions.entity';

@Injectable()
export class BenificiaryService {
    constructor(
        @InjectRepository(Benificiary)
        private benificiaryRepo: Repository<Benificiary>,
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
    ) {}

    async create(userId: number, createBenificiaryDto: CreateBenificiaryDto):Promise <Benificiary | any> {
        const {email} = createBenificiaryDto;
        const existing = await this.benificiaryRepo.findOneBy({email, userId});
        if(existing) {
            throw new ConflictException('Benificiary with this email already exists');
        }
        const benificiary = this.benificiaryRepo.create({
            ...createBenificiaryDto,
            userId,
        });
        return await this.benificiaryRepo.save(benificiary);
    }

    async findAllByUser(userId: number):Promise <Benificiary[]> {
        return await this.benificiaryRepo.find({
            where: { userId },
        });
    }

    async findOne(id: number) {
        const benificiary = await this.benificiaryRepo.findOneBy({ id });
        if (!benificiary) {
            throw new NotFoundException('Beneficiary not found');
        }
        return benificiary;
    }

    async findOneForUser(userId: number, id: number) {
        const ben = await this.benificiaryRepo.findOneBy({ id});
        if (!ben) throw new NotFoundException('Beneficiary not found');
        if (ben.userId !== userId) throw new NotFoundException('Beneficiary not found');
        return ben;
    }

    async updateForUser(userId: number, id: number, updateBenificiaryDto: UpdateBenificiaryDto) {
        const benificiary = await this.findOneForUser(userId, id);
        Object.assign(benificiary, updateBenificiaryDto);
        return await this.benificiaryRepo.save(benificiary);
    }

    async removeForUser(userId: number, id: number) {
        const benificiary = await this.findOneForUser(userId, id);
        // Delete all related transactions first
        await this.transactionRepo.delete({ benificiaryId: id });
        // Then delete the beneficiary
        const result = await this.benificiaryRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Beneficiary not found');
        }
    }
}
