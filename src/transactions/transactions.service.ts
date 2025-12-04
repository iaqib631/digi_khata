import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Benificiary } from '../benificiary/benificiary.entity';
import { BalanceSummaryDto } from './dtos/balance-summary.dto';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
        @InjectRepository(Benificiary)
        private benificiaryRepo: Repository<Benificiary>,
    ) {}

    async create(userId: number, createDto: CreateTransactionDto) {
        const { benificiaryId } = createDto;
        const ben = await this.benificiaryRepo.findOneBy({ id: benificiaryId });
        if (!ben) {
            throw new NotFoundException('Beneficiary not found');
        }
        if (ben.userId !== userId) {
            throw new ForbiddenException('Not allowed to add transaction for this beneficiary');
        }

        const tx = this.transactionRepo.create({
            ...createDto,
            userId,
        });
        return await this.transactionRepo.save(tx);
    }

    async findAllByUser(userId: number) {
        return await this.transactionRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    }

    async findAllByBeneficiary(userId: number, benificiaryId: number) {
        const ben = await this.benificiaryRepo.findOneBy({ id: benificiaryId });
        if (!ben) throw new NotFoundException('Beneficiary not found');
        if (ben.userId !== userId) throw new ForbiddenException('Not allowed to access this beneficiary');
        return await this.transactionRepo.find({ where: { benificiaryId }, order: { createdAt: 'DESC' } });
    }

    async findOne(userId: number, id: number) {
        const tx = await this.transactionRepo.findOneBy({ id });
        if (!tx) throw new NotFoundException('Transaction not found');
        if (tx.userId !== userId) throw new ForbiddenException('Not allowed to access this transaction');
        return tx;
    }

    async update(userId: number, id: number, update: Partial<CreateTransactionDto>) {
        const tx = await this.findOne(userId, id);
       
        if (update.benificiaryId && update.benificiaryId !== tx.benificiaryId) {
            const ben = await this.benificiaryRepo.findOneBy({ id: update.benificiaryId });
            if (!ben) throw new NotFoundException('Beneficiary not found');
            if (ben.userId !== userId) throw new ForbiddenException('Not allowed to move transaction to this beneficiary');
        }
        Object.assign(tx, update);
        return await this.transactionRepo.save(tx);
    }

    async remove(userId: number, id: number) {
        const tx = await this.findOne(userId, id);
        const result = await this.transactionRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Transaction not found');
        }
    }

    async getBalanceSummary(userId: number, benificiaryId: number): Promise<BalanceSummaryDto> {
        
        const ben = await this.benificiaryRepo.findOneBy({ id: benificiaryId });
        if (!ben) throw new NotFoundException('Beneficiary not found');
        if (ben.userId !== userId) throw new ForbiddenException('Not allowed to access this beneficiary');

       
        const transactions = await this.transactionRepo.find({
            where: { benificiaryId },
        });

        
        const totalIn = transactions
            .filter(tx => tx.type === 'in')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const totalOut = transactions
            .filter(tx => tx.type === 'out')
            .reduce((sum, tx) => sum + tx.amount, 0);

        const netBalance = totalIn - totalOut;

        return {
            totalIn,
            totalOut,
            netBalance,
        };
    }
}
