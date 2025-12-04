import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignupResponseDto {
  @ApiProperty({ example: 'Account created successfully' })
  @Expose()
  message: string;
}
