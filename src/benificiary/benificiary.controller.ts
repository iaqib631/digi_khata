import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { BenificiaryService } from './benificiary.service';
import { CreateBenificiaryDto } from './dtos/create-benificiary.dto';
import { Benificiary } from './benificiary.entity';

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
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.benificiaryService.findOne(id);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update a beneficiary' })
    @ApiResponse({ status: 200, description: 'Beneficiary updated successfully' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBenificiaryDto: Partial<CreateBenificiaryDto>,
    ) {
        return await this.benificiaryService.update(id, updateBenificiaryDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete a beneficiary' })
    @ApiResponse({ status: 200, description: 'Beneficiary deleted successfully' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.benificiaryService.remove(id);
        return { message: 'Beneficiary deleted successfully' };
    }
}
