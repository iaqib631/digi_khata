import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Benificiary } from './benificiary.entity';
import { CreateBenificiaryDto } from './dtos/create-benificiary.dto';

@Injectable()
export class BenificiaryService {
    constructor(
        @InjectRepository(Benificiary)
        private benificiaryRepo: Repository<Benificiary>,
    ) {}

    async create(userId: number, createBenificiaryDto: CreateBenificiaryDto):Promise <Benificiary | any> {
        const {email} = createBenificiaryDto;
        const existing = await this.benificiaryRepo.findOneBy({email});
        if(existing) {
            throw new ConflictException('Benificiary already exists');
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

    async update(id: number, updateBenificiaryDto: Partial<CreateBenificiaryDto>) {
        const benificiary = await this.findOne(id);
        Object.assign(benificiary, updateBenificiaryDto);
        return await this.benificiaryRepo.save(benificiary);
    }

    async remove(id: number) {
        const result = await this.benificiaryRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Beneficiary not found');
        }
    }
}
