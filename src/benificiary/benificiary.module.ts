import { Module } from '@nestjs/common';
import { BenificiaryController } from './benificiary.controller';
import { BenificiaryService } from './benificiary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benificiary } from './benificiary.entity';
import { Transaction } from '../transactions/transactions.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Benificiary, Transaction]),
    AuthModule,
  ],
  controllers: [BenificiaryController],
  providers: [BenificiaryService],
  exports: [BenificiaryService],
})
export class BenificiaryModule {}
