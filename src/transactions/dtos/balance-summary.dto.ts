import { ApiProperty } from '@nestjs/swagger';

export class BalanceSummaryDto {
    @ApiProperty({ example: 10000, description: 'Total in' })
    totalIn: number;

    @ApiProperty({ example: 5000, description: 'Total Out' })
    totalOut: number;

    @ApiProperty({ example: 5000, description: 'Net balance' })
    netBalance: number;
}
