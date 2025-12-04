import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';


@ApiBearerAuth('access-token')
@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post()
    async create(@Body() createDto: CreateTransactionDto, @Request() req) {
        const userId = req.user.id;
        return await this.transactionsService.create(userId, createDto);
    }

    @Get()
    async findAll(@Request() req) {
        const userId = req.user.id;
        return await this.transactionsService.findAllByUser(userId);
    }

    @Get('beneficiary/:bid')
    async findByBeneficiary(@Param('bid', ParseIntPipe) bid: number, @Request() req) {
        const userId = req.user.id;
        return await this.transactionsService.findAllByBeneficiary(userId, bid);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user.id;
        return await this.transactionsService.findOne(userId, id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: Partial<CreateTransactionDto>, @Request() req) {
        const userId = req.user.id;
        return await this.transactionsService.update(userId, id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user.id;
        await this.transactionsService.remove(userId, id);
        return { message: 'Transaction deleted successfully' };
    }
   
}
