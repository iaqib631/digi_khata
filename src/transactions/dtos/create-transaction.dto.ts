import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty({ example: 5000, description: 'Amount of transaction' })
    @IsNumber()
    amount: number;

    @ApiProperty({ example: 'in', enum: ['in', 'out'], description: 'Type of transaction' })
    @IsEnum(['in', 'out'])
    type: 'in' | 'out';

    @ApiProperty({ description: 'Beneficiary id this transaction belongs to' })
    @IsNumber()
    benificiaryId: number;

    @ApiProperty({ required: false, description: 'Optional description' })
    @IsOptional()
    @IsString()
    description?: string;
}
