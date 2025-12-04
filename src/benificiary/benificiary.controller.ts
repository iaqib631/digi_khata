import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { AuthGuard } from 'src/guards/auth.guard';
import { BenificiaryService } from './benificiary.service';
import { CreateBenificiaryDto } from './dtos/create-benificiary.dto';
import { UpdateBenificiaryDto } from './dtos/update-benificiary.dto';


@ApiBearerAuth('access-token')
@Controller('benificiary')
@UseGuards(AuthGuard)
export class BenificiaryController {
    constructor(private benificiaryService: BenificiaryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new beneficiary' })
    @ApiResponse({ status: 201, description: 'Beneficiary created successfully' })
    async create(@Body() createBenificiaryDto: CreateBenificiaryDto, @Request() req) {
        const userId = req.user.id;
        return await this.benificiaryService.create(userId, createBenificiaryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all beneficiaries for current user' })
    @ApiResponse({ status: 200, description: 'List of beneficiaries' })
    async findAll(@Request() req) {
        const userId = req.user.id;
        return await this.benificiaryService.findAllByUser(userId);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Get a specific beneficiary' })
    @ApiResponse({ status: 200, description: 'Beneficiary details' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user.id;
        return await this.benificiaryService.findOneForUser(userId, id);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update a beneficiary' })
    @ApiResponse({ status: 200, description: 'Beneficiary updated successfully' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBenificiaryDto: UpdateBenificiaryDto,
        @Request() req,
    ) {
        const userId = req.user.id;
        return await this.benificiaryService.updateForUser(userId, id, updateBenificiaryDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete a beneficiary' })
    @ApiResponse({ status: 200, description: 'Beneficiary deleted successfully' })
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user.id;
        await this.benificiaryService.removeForUser(userId, id);
        return { message: 'Beneficiary deleted successfully' };
    }
}
