import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';


@ApiBearerAuth('access-token')
@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

   
}
