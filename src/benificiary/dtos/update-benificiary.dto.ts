import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateBenificiaryDto{
     @ApiProperty({
                example: 'haseeb',
                description: 'name of the benificiary'
            })
        @IsString()
        name: string;
    
        @ApiProperty({
            example: 'haseeb@gmail.com',
            description: 'email of the benificiary'
        })
        @IsEmail()
        email:string;
    
        @ApiProperty({
            example: '03001123409',
            description: 'Phone number as string'
        })
        @IsString()
        phone: string;
    
        @ApiProperty({
            example: 'street 4,lahore',
            description: 'Address'
        })
        @IsString()
        address: string;
}