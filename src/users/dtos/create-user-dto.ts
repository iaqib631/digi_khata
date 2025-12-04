import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'johndove@gmail.com',
        description: 'email of the user'
    })
    @IsEmail()
    email: string;


    @ApiProperty({
        example: '123456',
        description: 'Password of the user'
    })
    @IsString()
    password: string;
}